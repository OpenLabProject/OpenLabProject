using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLabProject1.Data;
using OpenLabProject1.Models;

namespace OpenLabProject1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GuildController : Controller
    {
        private readonly ApplicationDbContext _context;

        public GuildController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<GuildDto> GetGuildInformation()
        {
            IEnumerable<GuildInformation> guildInformation = _context.Guild;

            return guildInformation.Select(guild => new GuildDto
            {
                Id = guild.Id,
                Name = guild.Name,
                Description = guild.Description,
                GuildMaxMembers = guild.GuildMaxMembers,
                MembersCount = GetGuildMembersCount(guild.Id)
            });
        }

        private int GetGuildMembersCount(int guildId)
        {
            IQueryable<ApplicationUser> users = _context.Users.Include(user => user.GuildInformation).AsNoTracking();

            return users.Where(user => user.GuildInformation.Id == guildId).Count();
        }

        [HttpGet]
        [Route("getGuildById")]
        public GuildDetailDto GetGuildById(int id)
        {
            GuildInformation guild = _context.Guild.Where(guild => guild.Id == id).FirstOrDefault();

            if (guild != null)
            {
                return new GuildDetailDto
                {
                    Id = guild.Id,
                    Name = guild.Name,
                    Description = guild.Description,
                    GuildMaxMembers = guild.GuildMaxMembers,
                    MembersCount = GetGuildMembersCount(guild.Id),
                    UsersInGuild = GetUsersInGuildById(guild.Id),
                };
            }
            else
            {
                return null;
            }
        }
        public IEnumerable<UserDto> GetUsersInGuildById(int id)
        {
            return _context.Users
                .Include(user => user.GuildInformation)
                .Where(user => user.GuildInformation.Id == id)
                .Select(user => new UserDto
                {
                    Guild = user.GuildInformation.Name,
                    UserName = user.UserName,
                    Email = user.Email,
                    Xp = user.XP
                });
        }
    }
}

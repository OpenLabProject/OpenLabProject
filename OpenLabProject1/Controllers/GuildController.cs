using Microsoft.AspNetCore.Mvc;
using OpenLabProject1.Data;
using OpenLabProject1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

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
            IEnumerable<GuildInformation> dbGuilds = _context.Guild;

            return dbGuilds.Select(dbGuilds => new GuildDto
            {
                Id = dbGuilds.Id,
                Name = dbGuilds.Name,
                Description = dbGuilds.Description,
                GuildMaxMembers = dbGuilds.GuildMaxMembers,
                MembersCount = GetguildMembersCount(dbGuilds.Id)
            });
        }


        private int GetguildMembersCount(int guildId)
        {
            IQueryable<ApplicationUser> users = _context.Users.Include(applicationUser => applicationUser.GuildInformation).AsNoTracking();

            return users.Where(u => u.GuildInformation.Id == guildId).Count();
        }

    }
}

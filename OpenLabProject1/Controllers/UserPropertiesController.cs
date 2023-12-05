using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLabProject1.Data;
using OpenLabProject1.Data.Migrations;
using OpenLabProject1.Models;
using System;
using System.Security.Claims;
using System.Xml.XPath;

namespace OpenLabProject1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserPropertiesController : Controller
    {

        private readonly ILogger<UserPropertiesController> _logger;
        private readonly ApplicationDbContext _context;

        public UserPropertiesController(ILogger<UserPropertiesController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }
        [HttpGet]
        public ActionResult<UserDto> Get()
        {

            var myUser = GetCurrentUser();
            var info = new UserDto
            {
                Xp = myUser.XP,
                Guild = myUser.GuildInformation?.Name,


            };
            return info;
        }

        private Models.ApplicationUser GetCurrentUser()
        {
            var userid = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Models.ApplicationUser? user = _context.Users
                .Include(user => user.GuildInformation)
                .SingleOrDefault(user => user.Id == userid);

            return user;
        }

        private int GetGuildMembersCount(int guildId)
        {
            IQueryable<ApplicationUser> users = _context.Users.Include(user => user.GuildInformation).AsNoTracking();

            return users.Where(user => user.GuildInformation.Id == guildId).Count();
        }

        [HttpPut]
        [Route("joinGuild")]
        public ActionResult<GuildDetailDto> JoinGuild(int id)
        {
            var currentUser = GetCurrentUser();
            var newGuild = _context.Guild.Find(id);

            if (newGuild == null)
            {
                return NotFound();
            }

            currentUser.GuildInformation = newGuild;
             _context.SaveChanges();

            return Ok(new GuildDetailDto
            {
                Id = newGuild.Id,
                Name = newGuild.Name,
                Description = newGuild.Description,
                GuildMaxMembers = newGuild.GuildMaxMembers,
                MembersCount = GetGuildMembersCount(newGuild.Id),
                    UsersInGuild = GetUsersInGuildById(newGuild.Id),

            }); 
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
        [HttpPut]
        [Route("leaveGuild")]
        public ActionResult<GuildDetailDto> LeaveGuild()
        {
            var currentUser = GetCurrentUser();

            if (currentUser.GuildInformation == null)
            {
                return NotFound();
            }

            var guild = currentUser.GuildInformation;
            guild.Members.Remove(currentUser);
             _context.SaveChanges();

            return Ok(new GuildDetailDto
            {
                Id = guild.Id,
                Name = guild.Name,
                Description = guild.Description,
                GuildMaxMembers = guild.GuildMaxMembers,
                MembersCount = GetGuildMembersCount(guild.Id),
                UsersInGuild = GetUsersInGuildById(guild.Id),

            });
        }


        [HttpGet]
        [Route("isInGuild")]
        public bool IsInGuild(int id)
        {
            var user = GetCurrentUser();
            return user.GuildInformation is null;
        }

        [HttpGet]
        [Route("hasThisGuild")]
        public bool HasThisGuild(int id)
        {
            var currentGuild = _context.Guild.Find(id);
            var currentUser = GetCurrentUser();
            return currentUser.GuildInformation == currentGuild;

        }
    }
}



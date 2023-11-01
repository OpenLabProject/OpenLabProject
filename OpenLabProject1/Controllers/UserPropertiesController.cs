using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLabProject1.Data;
using OpenLabProject1.Models;
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

            Models.ApplicationUser user = _context.Users
                .Include(user => user.GuildInformation)
                .SingleOrDefault(user => user.Id == userid);

            return user;
        }

    }


}
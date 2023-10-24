using Microsoft.AspNetCore.Mvc;
using OpenLabProject1.Data;
using OpenLabProject1.Models;
using Microsoft.AspNetCore.Authorization;


namespace OpenLabProject1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GuildController : Controller
    {
        private readonly ILogger<GuildController> _logger;
        private readonly ApplicationDbContext _context;

        public GuildController(ILogger<GuildController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }
        [HttpGet]
        public IEnumerable<GuildInformation> Get()
        {
            var myGuild = _context.Guild;
            return myGuild;
        }
    }
}
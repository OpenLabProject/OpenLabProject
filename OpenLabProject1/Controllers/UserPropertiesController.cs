using Microsoft.AspNetCore.Mvc;
using OpenLabProject1.Data;
using OpenLabProject1.Models;
using Microsoft.AspNetCore.Authorization;


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
        public IEnumerable<ApplicationUser> Get()
        {
            var myUsers = _context.ApplicationUsers;
            return myUsers;
        }
    
    }
}

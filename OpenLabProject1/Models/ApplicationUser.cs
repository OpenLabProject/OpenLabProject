using Microsoft.AspNetCore.Identity;
using System.Xml.XPath;

namespace OpenLabProject1.Models
{
    public class ApplicationUser : IdentityUser
    {
        
        public int XP { get; set; }
        public GuildInformation? GuildInformation { get; set; }
    }
   
}
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace OpenLabProject1.Models
{
    public class GuildInformation
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }

        public int GuildMaxMembers { get; set; }

        public ICollection<ApplicationUser> Members { get; } = new List<ApplicationUser>();
    }
}

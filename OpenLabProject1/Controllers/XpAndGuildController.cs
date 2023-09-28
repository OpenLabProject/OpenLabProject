using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using OpenLabProject1.Models;
using System.Numerics;

namespace OpenLabProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class XPAndGuildController : ControllerBase
    {
        public async Task<List<ApplicationUser>> GetXPAndGuild()
        {
            
            using (var connection = new SqlConnection("Server=aspnet-OpenLabProject1-53bc9b9d-9d6a-45d4-8429-2a2761773502;Database=MyDatabase;Integrated Security=True"))
            {
                
                var command = new SqlCommand("SELECT XP, GuildName FROM MyTable", connection);
                await connection.OpenAsync();
                var reader = await command.ExecuteReaderAsync();

             
                var xpAndGuildList = new List<ApplicationUser>();

                
                while (reader.Read())
                {
                    var xpAndGuild = new ApplicationUser();
                    xpAndGuild.XP = reader.GetInt32(0);
                    xpAndGuild.GuildName = reader.GetString(1);
                    xpAndGuildList.Add(xpAndGuild);
                }

               
                await connection.CloseAsync();

                
                return xpAndGuildList;
            }
        }
    }

}
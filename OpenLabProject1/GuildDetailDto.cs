namespace OpenLabProject1
{
    public class GuildDetailDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }

        public int GuildMaxMembers { get; set; }

        public int MembersCount { get; set; }

        public string? GuildInformation { get; set; }

        public IEnumerable<UserDto> UsersInGuild { get; set; }
    }
}

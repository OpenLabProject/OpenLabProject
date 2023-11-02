using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenLabProject1.Data.Migrations
{
    /// <inheritdoc />
    public partial class migration4oprava : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MembersCount",
                table: "Guild");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MembersCount",
                table: "Guild",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

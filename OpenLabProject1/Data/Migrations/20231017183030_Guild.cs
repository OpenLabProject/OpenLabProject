using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenLabProject1.Data.Migrations
{
    /// <inheritdoc />
    public partial class Guild : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GuildName",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "GuildInformationId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Guild",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GuildMaxMembers = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guild", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GuildInformationId",
                table: "AspNetUsers",
                column: "GuildInformationId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Guild_GuildInformationId",
                table: "AspNetUsers",
                column: "GuildInformationId",
                principalTable: "Guild",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Guild_GuildInformationId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Guild");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_GuildInformationId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GuildInformationId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "GuildName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

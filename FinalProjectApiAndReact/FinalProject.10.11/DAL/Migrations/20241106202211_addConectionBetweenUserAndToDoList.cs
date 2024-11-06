using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class addConectionBetweenUserAndToDoList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "ToDosList",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ToDosList_UserId",
                table: "ToDosList",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDosList_AspNetUsers_UserId",
                table: "ToDosList",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDosList_AspNetUsers_UserId",
                table: "ToDosList");

            migrationBuilder.DropIndex(
                name: "IX_ToDosList_UserId",
                table: "ToDosList");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ToDosList");
        }
    }
}

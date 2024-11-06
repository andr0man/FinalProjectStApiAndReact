using DAL.Models.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models.ToDos
{
    public class ToDoList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }

        [ForeignKey(nameof(Category))]
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
        public User User { get; set; }
        public List<ToDo> ToDos { get; set; }

    }
}

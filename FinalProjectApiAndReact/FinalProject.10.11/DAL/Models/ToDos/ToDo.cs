using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models.ToDos
{
    public class ToDo
    {
        public required Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }

        [ForeignKey(nameof(ToDoList))]
        public Guid ToDoListId { get; set; }
        public ToDoList ToDoList { get; set; }

    }
}

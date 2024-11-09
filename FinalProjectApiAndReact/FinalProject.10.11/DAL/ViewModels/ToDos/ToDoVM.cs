namespace DAL.ViewModels.ToDos
{
    public class ToDoVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public string ToDoListName { get; set; }
    }

    public class CreateUpdateToDoVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public Guid ToDoListId { get; set; }
    }
}

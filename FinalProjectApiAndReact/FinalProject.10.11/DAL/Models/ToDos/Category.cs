namespace DAL.Models.ToDos
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<ToDoList> ToDosList { get; set; } = new();
    }
}
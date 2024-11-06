namespace DAL.ViewModels.ToDos
{
    public class ToDoListVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public string CategoryName { get; set; }
        public string UserName { get; set; }
    }

    public class CreateUpdateToDoListVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public Guid CategoryId { get; set; }
        public string UserId { get; set; }
    }
}

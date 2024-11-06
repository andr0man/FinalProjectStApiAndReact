using DAL.Models.ToDos;
using System.Linq.Expressions;

namespace DAL.Repositories.ToDoRepository
{
    public interface IToDoRepository
    {
        Task<ToDo?> GetAsync(Expression<Func<ToDo, bool>> predicate);
        Task<ToDo?> GetByIdAsync(Guid id);
        Task<List<ToDo>> GetAllAsync();
        Task AddAsync(ToDo model);
        Task UpdateAsync(ToDo model);
        Task DeleteAsync(ToDo model);
        Task<List<ToDo>> GetByToDoListIdAsync(Guid toDoListId);
    }
}

using DAL.Models.ToDos;
using System.Linq.Expressions;

namespace DAL.Repositories.ToDoListRepository
{
    public interface IToDoListRepository
    {
        Task<ToDoList?> GetAsync(Expression<Func<ToDoList, bool>> predicate);
        Task<ToDoList?> GetByIdAsync(Guid id);
        Task<List<ToDoList>> GetAllAsync();
        Task AddAsync(ToDoList model);
        Task UpdateAsync(ToDoList model);
        Task DeleteAsync(ToDoList model);
        Task<List<ToDoList>> GetByUserIdAsync(string userId);
        Task<List<ToDoList>> GetByCategoryIdAsync(Guid categoryId);
    }
}

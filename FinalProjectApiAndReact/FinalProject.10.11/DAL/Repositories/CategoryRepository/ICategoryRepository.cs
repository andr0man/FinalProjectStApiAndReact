using DAL.Models;
using DAL.Models.ToDos;
using System.Linq.Expressions;

namespace DAL.Repositories.CategoryRepository
{
    public interface ICategoryRepository
    {
        Task<Category?> GetAsync(Expression<Func<Category, bool>> predicate);
        Task<Category?> GetByIdAsync(Guid id);
        Task<List<Category>> GetAllAsync();
        Task AddAsync(Category model);
        Task UpdateAsync(Category model);
        Task DeleteAsync(Category model);
        Task<bool> IsUniqueNameAsync(string name);
    }
}

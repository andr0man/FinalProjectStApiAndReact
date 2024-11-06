using DAL.Data;
using DAL.Models.ToDos;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DAL.Repositories.CategoryRepository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Category model)
        {
            await _context.Categories.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Category model)
        {
            _context.Categories.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Category model)
        {
            _context.Categories.Remove(model);
            await _context.SaveChangesAsync();
        }

        public async Task<Category?> GetAsync(Expression<Func<Category, bool>> predicate)
        {
            return await _context.Categories.FirstOrDefaultAsync(predicate);
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<bool> IsUniqueNameAsync(string name)
        {
            return await _context.Categories.AllAsync(c => c.Name != name);
        }
    }
}

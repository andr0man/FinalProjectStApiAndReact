using DAL.Data;
using DAL.Models.ToDos;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DAL.Repositories.ToDoListRepository
{
    public class ToDoListRepository : IToDoListRepository
    {
        private readonly AppDbContext _context;

        public ToDoListRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(ToDoList model)
        {
            await _context.ToDosList.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(ToDoList model)
        {
            _context.ToDosList.Remove(model);
            await _context.SaveChangesAsync();
        }

        public async Task<ToDoList?> GetAsync(Expression<Func<ToDoList, bool>> predicate)
        {
            return await _context.ToDosList
                .Include(tdl => tdl.Category)
                .Include(tdl => tdl.User)
                .Include(tdl => tdl.ToDos)
                .FirstOrDefaultAsync(predicate);
        }

        public async Task<ToDoList?> GetByIdAsync(Guid id)
        {
            return await _context.ToDosList
                .Include(tdl => tdl.Category)
                .Include(tdl => tdl.User)
                .Include(tdl => tdl.ToDos)
                .FirstOrDefaultAsync(tdl => tdl.Id == id);
        }

        public async Task<List<ToDoList>> GetAllAsync()
        {
            return await _context.ToDosList
                .Include(tdl => tdl.Category)
                .Include(tdl => tdl.User)
                .Include(tdl => tdl.ToDos)
                .ToListAsync();
        }

        public async Task<List<ToDoList>> GetByUserIdAsync(string userId)
        {
            return await _context.ToDosList
                .Where(tdl => tdl.UserId == userId)
                .Include(tdl => tdl.Category)
                .Include(tdl => tdl.User)
                .Include(tdl => tdl.ToDos)
                .ToListAsync();
        }

        public async Task<List<ToDoList>> GetByCategoryIdAsync(Guid categoryId)
        {
            return await _context.ToDosList
                .Where(tdl => tdl.CategoryId == categoryId)
                .Include(tdl => tdl.Category)
                .Include(tdl => tdl.User)
                .Include(tdl => tdl.ToDos)
                .ToListAsync();
        }

        public async Task UpdateAsync(ToDoList model)
        {
            _context.ToDosList.Update(model);
            await _context.SaveChangesAsync();
        }
    }
}

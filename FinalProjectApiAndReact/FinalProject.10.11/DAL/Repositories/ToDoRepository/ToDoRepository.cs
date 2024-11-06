using DAL.Data;
using DAL.Models.ToDos;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DAL.Repositories.ToDoRepository
{
    public class ToDoRepository : IToDoRepository
    {
        private readonly AppDbContext _context;

        public ToDoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(ToDo model)
        {
            await _context.ToDos.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(ToDo model)
        {
            _context.ToDos.Remove(model);
            await _context.SaveChangesAsync();
        }

        public async Task<ToDo?> GetAsync(Expression<Func<ToDo, bool>> predicate)
        {
            return await _context.ToDos
                .Include(td => td.ToDoList)
                .FirstOrDefaultAsync(predicate);
        }

        public async Task<ToDo?> GetByIdAsync(Guid id)
        {
            return await _context.ToDos
                .Include(td => td.ToDoList)
                .FirstOrDefaultAsync(td => td.Id == id);
        }

        public async Task<List<ToDo>> GetAllAsync()
        {
            return await _context.ToDos
                .Include(td => td.ToDoList)
                .ToListAsync();
        }

        public async Task<List<ToDo>> GetByToDoListIdAsync(Guid toDoListId)
        {
            return await _context.ToDos
                .Where(td => td.ToDoListId == toDoListId)
                .Include(td => td.ToDoList)
                .ToListAsync();
        }

        public async Task UpdateAsync(ToDo model)
        {
            _context.ToDos.Update(model);
            await _context.SaveChangesAsync();
        }
    }
}

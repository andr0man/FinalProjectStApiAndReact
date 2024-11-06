using BLL.Services;
using DAL.ViewModels.ToDos;

namespace BLL.Services.ToDoListService
{
    public interface IToDoListService
    {
        Task<ServiceResponse> CreateAsync(CreateUpdateToDoListVM model);
        Task<ServiceResponse> UpdateAsync(CreateUpdateToDoListVM model);
        Task<ServiceResponse> DeleteAsync(Guid id);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> GetByIdAsync(Guid id);
        Task<ServiceResponse> GetByUserIdAsync(string userId);
        Task<ServiceResponse> GetByCategoryIdAsync(Guid categoryId);
    }
}

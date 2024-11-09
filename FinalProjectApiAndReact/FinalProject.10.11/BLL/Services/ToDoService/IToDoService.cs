using DAL.ViewModels.ToDos;

namespace BLL.Services.ToDoService
{
    public interface IToDoService
    {
        Task<ServiceResponse> CreateAsync(CreateUpdateToDoVM model);
        Task<ServiceResponse> UpdateAsync(CreateUpdateToDoVM model, CancellationToken cancellation);
        Task<ServiceResponse> DeleteAsync(Guid id);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> GetByIdAsync(Guid id);
        Task<ServiceResponse> GetByToDoListIdAsync(Guid toDoListId);
        Task<ServiceResponse> ToggleCompletion(Guid id, CancellationToken cancellation);
    }
}

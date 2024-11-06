using BLL.Services;
using DAL.ViewModels.ToDos;

namespace BLL.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<ServiceResponse> CreateAsync(CreateUpdateCategoryVM model);
        Task<ServiceResponse> UpdateAsync(CreateUpdateCategoryVM model);
        Task<ServiceResponse> DeleteAsync(Guid id);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> GetByIdAsync(Guid id);
        Task<ServiceResponse> GetByNameAsync(string name);
    }
}

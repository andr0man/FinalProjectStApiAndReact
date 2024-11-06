using Dashboard.DAL.ViewModels.User;

namespace Dashboard.BLL.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse> GetById(string id);
        Task<ServiceResponse> GetByEmail(string email);
        Task<ServiceResponse> GetByUserName(string userName);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> CreateAsync(CreateUpdateUserVM model);
        Task<ServiceResponse> UpdateAsync(CreateUpdateUserVM model);
        Task<ServiceResponse> AddImageFromUserAsync(UserImageVM model);
        Task<ServiceResponse> AddRoleToUser(AddDeleteUserRoleVM model);
        Task<ServiceResponse> DeleteRoleFromUser(AddDeleteUserRoleVM model);
    }
}

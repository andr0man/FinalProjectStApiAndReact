using Dashboard.DAL.ViewModels.Auth;

namespace Dashboard.BLL.Services.AccountService
{
    public interface IAccountService
    {
        Task<ServiceResponse> SignInAsync(SignInVM model);
        Task<ServiceResponse> SignUpAsync(SignUpVM model);
        Task<ServiceResponse> EmailConfirmAsync(string id, string token);
    }
}

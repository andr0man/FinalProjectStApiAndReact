using DAL.ViewModels.Auth;

namespace BLL.Services.AccountService
{
    public interface IAccountService
    {
        Task<ServiceResponse> SignInAsync(SignInVM model);
        Task<ServiceResponse> SignUpAsync(SignUpVM model);
        Task<ServiceResponse> EmailConfirmAsync(string id, string token);
    }
}

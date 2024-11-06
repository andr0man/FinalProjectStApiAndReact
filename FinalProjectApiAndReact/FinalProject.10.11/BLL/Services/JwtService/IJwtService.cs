using DAL.Models.Identity;
using DAL.ViewModels;

namespace BLL.Services.JwtService
{
    public interface IJwtService
    {
        Task<ServiceResponse> GenerateTokensAsync(User user);
        Task<ServiceResponse> RefreshTokensAsync(JwtVM model);
    }
}

using Microsoft.AspNetCore.Http;

namespace Dashboard.DAL.ViewModels.User
{
    public class UserImageVM
    {
        public string UserId { get; set; }
        public IFormFile Image { get; set; }
    }
}

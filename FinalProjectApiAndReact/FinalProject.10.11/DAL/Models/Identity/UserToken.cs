using Microsoft.AspNetCore.Identity;

namespace DAL.Models.Identity
{
    public class UserToken : IdentityUserToken<string>
    {
        public virtual User User { get; set; }
    }
}

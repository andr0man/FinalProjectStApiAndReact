using Microsoft.AspNetCore.Identity;

namespace DAL.Models.Identity
{
    public class UserClaim : IdentityUserClaim<string>
    {
        public virtual User User { get; set; }
    }
}

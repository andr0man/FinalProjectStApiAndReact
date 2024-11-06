﻿using Microsoft.AspNetCore.Identity;

namespace DAL.Models.Identity
{
    public class UserLogin : IdentityUserLogin<string>
    {
        public virtual User User { get; set; }
    }
}

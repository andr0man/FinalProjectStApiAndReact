using Dashboard.DAL.Models.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Dashboard.DAL.Data.Initializer
{
    public static class DataSeeder
    {
        public static async void SeedData(this IApplicationBuilder builder)
        {
            using (var scope = builder.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();

                if (!roleManager.Roles.Any())
                {
                    var adminRole = new Role
                    {
                        Id = Settings.AdminRole,
                        Name = Settings.AdminRole,
                        NormalizedName = Settings.AdminRole.ToUpper()
                    };

                    var userRole = new Role
                    {
                        Id = Settings.UserRole,
                        Name = Settings.UserRole,
                        NormalizedName = Settings.UserRole.ToUpper()
                    };

                    var userManagerRole = new Role
                    {
                        Id = Settings.UserManagerRole,
                        Name = Settings.UserManagerRole,
                        NormalizedName = Settings.UserManagerRole.ToUpper()
                    };

                    var roleManagerRole = new Role
                    {
                        Id = Settings.RoleManagerRole,
                        Name = Settings.RoleManagerRole,
                        NormalizedName = Settings.RoleManagerRole.ToUpper()
                    };

                    await roleManager.CreateAsync(adminRole);
                    await roleManager.CreateAsync(userRole);
                    await roleManager.CreateAsync(userManagerRole);
                    await roleManager.CreateAsync(roleManagerRole);

                    var admin = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = "admin@gmail.com",
                        UserName = "admin",
                        FirstName = "Admin",
                        LastName = "User",
                        NormalizedEmail = "admin@gmail.com".ToUpper(),
                        NormalizedUserName = "admin".ToUpper()
                    };

                    await userManager.CreateAsync(admin, "string");

                    var user1 = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = "john.doe@gmail.com",
                        UserName = "john_doe",
                        FirstName = "John",
                        LastName = "Doe",
                        NormalizedEmail = "john.doe@gmail.com".ToUpper(),
                        NormalizedUserName = "john_doe".ToUpper()
                    };

                    var user2 = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = "jane.smith@yahoo.com",
                        UserName = "jane_smith",
                        FirstName = "Jane",
                        LastName = "Smith",
                        NormalizedEmail = "jane.smith@yahoo.com".ToUpper(),
                        NormalizedUserName = "jane_smith".ToUpper()
                    };

                    var user3 = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = "robert.miller@outlook.com",
                        UserName = "robert_miller",
                        FirstName = "Robert",
                        LastName = "Miller",
                        NormalizedEmail = "robert.miller@outlook.com".ToUpper(),
                        NormalizedUserName = "robert_miller".ToUpper()
                    };

                    await userManager.CreateAsync(user1, "string");
                    await userManager.CreateAsync(user2, "string");
                    await userManager.CreateAsync(user3, "string");


                    await userManager.AddToRoleAsync(admin, Settings.AdminRole);

                    await userManager.AddToRoleAsync(user1, Settings.UserRole);
                    await userManager.AddToRoleAsync(user2, Settings.UserManagerRole);
                    await userManager.AddToRoleAsync(user3, Settings.RoleManagerRole);
                }
            }
        }
    }
}

using AutoMapper;
using DAL.Models.Identity;
using DAL.ViewModels.Role;

namespace BLL.MappingProfiles
{
    public class RoleMapperProfile : Profile
    {
        public RoleMapperProfile()
        {
            // Role -> RoleVM
            CreateMap<Role, RoleVM>();

            // RoleVM -> Role
            CreateMap<RoleVM, Role>();
        }
    }
}

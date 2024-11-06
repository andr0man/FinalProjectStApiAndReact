using AutoMapper;
using DAL.Models.Identity;
using DAL.ViewModels.Role;

namespace BLL.MappingProfiles
{
    public class RoleMapperProfile : Profile
    {
        public RoleMapperProfile()
        {
            CreateMap<Role, RoleVM>().ReverseMap();
        }
    }
}

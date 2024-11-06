using AutoMapper;
using DAL.Models.Identity;
using DAL.ViewModels.User;
using DAL;

namespace BLL.MappingProfiles
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile()
        {
            // User -> UserVM
            CreateMap<User, UserVM>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(
                    src => src.UserRoles.Count > 0 ? src.UserRoles.First().Role.Name : "no role"));

            // CreateUpdateUserVM -> User
            CreateMap<CreateUpdateUserVM, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
        }
    }
}

using AutoMapper;
using DAL.Models.ToDos;
using DAL.ViewModels.ToDos;

namespace BLL.MappingProfiles
{
    public class ToDosListMapperProfile : Profile
    {
        public ToDosListMapperProfile()
        {
            CreateMap<ToDoList, ToDoListVM>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.ToDos, opt => opt.MapFrom(src => src.ToDos));

            CreateMap<ToDoList, CreateUpdateToDoListVM>().ReverseMap();
            CreateMap<ToDo, ToDoVM>()
                .ForMember(dest => dest.ToDoListName, opt => opt.MapFrom(src => src.ToDoList.Name));
        }
    }
}

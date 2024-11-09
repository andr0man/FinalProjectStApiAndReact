using AutoMapper;
using DAL.Models.ToDos;
using DAL.ViewModels.ToDos;

namespace BLL.MappingProfiles
{
    public class ToDosMapperProfile : Profile
    {
        public ToDosMapperProfile()
        {
            CreateMap<ToDo, ToDoVM>()
                .ForMember(dest => dest.DueDate, opt => opt.MapFrom(src => src.DueDate.ToString("dd.MM.yyyy")))
                .ReverseMap();

            CreateMap<ToDo, CreateUpdateToDoVM>().ReverseMap();
        }
    }

}

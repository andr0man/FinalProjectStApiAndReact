using AutoMapper;
using DAL.Models.ToDos;
using DAL.ViewModels.ToDos;

namespace BLL.MappingProfiles
{
    public class CategoryMapperProfile : Profile
    {
        public CategoryMapperProfile()
        {
            CreateMap<Category, CategoryVM>().ReverseMap();

            CreateMap<Category, CreateUpdateCategoryVM>().ReverseMap();
        }
    }
}

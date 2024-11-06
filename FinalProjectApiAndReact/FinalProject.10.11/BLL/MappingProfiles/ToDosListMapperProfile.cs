using AutoMapper;
using DAL.Models.ToDos;
using DAL.ViewModels.ToDos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.MappingProfiles
{
    public class ToDosListMapperProfile : Profile
    {
        public ToDosListMapperProfile()
        {
            CreateMap<ToDoList, ToDoListVM>().ReverseMap();

            CreateMap<ToDoList, CreateUpdateToDoListVM>().ReverseMap();
        }
    }
}

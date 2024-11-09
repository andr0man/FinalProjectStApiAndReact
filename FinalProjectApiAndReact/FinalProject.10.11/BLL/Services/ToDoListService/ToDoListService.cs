using AutoMapper;
using BLL.Services;
using DAL;
using DAL.Models.ToDos;
using DAL.Repositories.ToDoListRepository;
using DAL.ViewModels.ToDos;

namespace BLL.Services.ToDoListService
{
    public class ToDoListService : IToDoListService
    {
        private readonly IToDoListRepository _toDoListRepository;
        private readonly IMapper _mapper;

        public ToDoListService(IToDoListRepository toDoListRepository, IMapper mapper)
        {
            _toDoListRepository = toDoListRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> CreateAsync(CreateUpdateToDoListVM model)
        {
            var toDoList = _mapper.Map<ToDoList>(model);
            toDoList.Id = Guid.NewGuid();

            await _toDoListRepository.AddAsync(toDoList);

            return ServiceResponse.OkResponse("Список завдань успішно створено", toDoList);
        }

        public async Task<ServiceResponse> UpdateAsync(CreateUpdateToDoListVM model)
        {
            var toDoList = await _toDoListRepository.GetByIdAsync(model.Id);

            if (toDoList == null)
            {
                return ServiceResponse.BadRequestResponse($"Список завдань з id {model.Id} не знайдено");
            }

            toDoList = _mapper.Map(model, toDoList);
            await _toDoListRepository.UpdateAsync(toDoList);

            var toDoListShow = _mapper.Map<ToDoListVM>(toDoList);

            return ServiceResponse.OkResponse("Список завдань успішно оновлено", toDoListShow);
        }

        public async Task<ServiceResponse> DeleteAsync(Guid id)
        {
            var toDoList = await _toDoListRepository.GetByIdAsync(id);

            if (toDoList == null)
            {
                return ServiceResponse.BadRequestResponse($"Список завдань з id {id} не знайдено");
            }

            await _toDoListRepository.DeleteAsync(toDoList);

            return ServiceResponse.OkResponse("Список завдань успішно видалено");
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var toDoLists = await _toDoListRepository.GetAllAsync();
            var models = _mapper.Map<List<ToDoListVM>>(toDoLists);

            return ServiceResponse.OkResponse("Списки завдань отримано", models);
        }

        public async Task<ServiceResponse> GetByIdAsync(Guid id)
        {
            var toDoList = await _toDoListRepository.GetByIdAsync(id);

            if (toDoList == null)
            {
                return ServiceResponse.BadRequestResponse($"Список завдань з id {id} не знайдено");
            }

            var model = _mapper.Map<ToDoListVM>(toDoList);

            return ServiceResponse.OkResponse("Список завдань знайдено", model);
        }

        public async Task<ServiceResponse> GetByUserIdAsync(string userId)
        {
            var toDoLists = await _toDoListRepository.GetByUserIdAsync(userId);
            var models = _mapper.Map<List<ToDoListVM>>(toDoLists);

            return ServiceResponse.OkResponse("Списки завдань для користувача отримано", models);
        }

        public async Task<ServiceResponse> GetByCategoryIdAsync(Guid categoryId)
        {
            var toDoLists = await _toDoListRepository.GetByCategoryIdAsync(categoryId);
            var models = _mapper.Map<List<ToDoListVM>>(toDoLists);

            return ServiceResponse.OkResponse("Списки завдань для категорії отримано", models);
        }
    }
}

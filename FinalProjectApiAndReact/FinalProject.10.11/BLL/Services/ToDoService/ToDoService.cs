using AutoMapper;
using DAL.Models.ToDos;
using DAL.Repositories.ToDoRepository;
using DAL.ViewModels.ToDos;
using BLL.Services;
using Microsoft.VisualBasic;

namespace BLL.Services.ToDoService
{
    public class ToDoService : IToDoService
    {
        private readonly IToDoRepository _toDoRepository;
        private readonly IMapper _mapper;

        public ToDoService(IToDoRepository toDoRepository, IMapper mapper)
        {
            _toDoRepository = toDoRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> CreateAsync(CreateUpdateToDoVM model)
        {
            model.IsCompleted = false;

            var toDo = _mapper.Map<ToDo>(model);
            toDo.Id = Guid.NewGuid();

            await _toDoRepository.AddAsync(toDo);

            return ServiceResponse.OkResponse("Завдання успішно створено", toDo);
        }

        public async Task<ServiceResponse> UpdateAsync(CreateUpdateToDoVM model, CancellationToken cancellation)
        {
            var toDo = await _toDoRepository.GetByIdAsync(model.Id);

            if (toDo == null)
            {
                return ServiceResponse.BadRequestResponse($"Завдання з id {model.Id} не знайдено");
            }

            toDo = _mapper.Map(model, toDo);
            await _toDoRepository.UpdateAsync(toDo, cancellation);
            var toDoToShow = _mapper.Map<ToDoVM>(toDo);

            return ServiceResponse.OkResponse("Завдання успішно оновлено", toDoToShow);
        }

        public async Task<ServiceResponse> DeleteAsync(Guid id)
        {
            var toDo = await _toDoRepository.GetByIdAsync(id);

            if (toDo == null)
            {
                return ServiceResponse.BadRequestResponse($"Завдання з id {id} не знайдено");
            }

            await _toDoRepository.DeleteAsync(toDo);

            return ServiceResponse.OkResponse("Завдання успішно видалено");
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var toDos = await _toDoRepository.GetAllAsync();
            var models = _mapper.Map<List<ToDoVM>>(toDos);

            return ServiceResponse.OkResponse("Завдання отримано", models);
        }

        public async Task<ServiceResponse> GetByIdAsync(Guid id)
        {
            var toDo = await _toDoRepository.GetByIdAsync(id);

            if (toDo == null)
            {
                return ServiceResponse.BadRequestResponse($"Завдання з id {id} не знайдено");
            }

            var model = _mapper.Map<ToDoVM>(toDo);

            return ServiceResponse.OkResponse("Завдання знайдено", model);
        }

        public async Task<ServiceResponse> GetByToDoListIdAsync(Guid toDoListId)
        {
            var toDos = await _toDoRepository.GetByToDoListIdAsync(toDoListId);
            var models = _mapper.Map<List<ToDoVM>>(toDos);

            return ServiceResponse.OkResponse("Завдання для списку завдань отримано", models);
        }

        public async Task<ServiceResponse> ToggleCompletion(Guid id, CancellationToken cancellation)
        {
            var toDo = await _toDoRepository.GetByIdAsync(id);

            if (toDo == null)
            {
                return ServiceResponse.BadRequestResponse($"Завдання з id {id} не знайдено");
            }

            toDo.IsCompleted = !toDo.IsCompleted;

            await _toDoRepository.UpdateAsync(toDo, cancellation);
            var models = _mapper.Map<ToDoVM>(toDo);

            return ServiceResponse.OkResponse("Виконання завдання змінено успішно", models);
        }
    }
}

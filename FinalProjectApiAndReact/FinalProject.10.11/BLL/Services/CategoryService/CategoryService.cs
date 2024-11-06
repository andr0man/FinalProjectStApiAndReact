using AutoMapper;
using BLL.Services;
using DAL;
using DAL.Models.ToDos;
using DAL.Repositories.CategoryRepository;
using DAL.ViewModels.ToDos;

namespace BLL.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> CreateAsync(CreateUpdateCategoryVM model)
        {
            var isUnique = await _categoryRepository.IsUniqueNameAsync(model.Name);
            if (!isUnique)
            {
                return ServiceResponse.BadRequestResponse("Назва категорії вже існує");
            }

            var category = _mapper.Map<Category>(model);
            category.Id = Guid.NewGuid();

            await _categoryRepository.AddAsync(category);

            return ServiceResponse.OkResponse("Категорія успішно створена", category);
        }

        public async Task<ServiceResponse> UpdateAsync(CreateUpdateCategoryVM model)
        {
            var category = await _categoryRepository.GetByIdAsync(model.Id);

            if (category == null)
            {
                return ServiceResponse.BadRequestResponse($"Категорія з id {model.Id} не знайдена");
            }

            category = _mapper.Map(model, category);

            await _categoryRepository.UpdateAsync(category);

            return ServiceResponse.OkResponse("Категорія успішно оновлена", category);
        }

        public async Task<ServiceResponse> DeleteAsync(Guid id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return ServiceResponse.BadRequestResponse($"Категорія з id {id} не знайдена");
            }

            await _categoryRepository.DeleteAsync(category);

            return ServiceResponse.OkResponse("Категорія успішно видалена");
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
            var models = _mapper.Map<List<CategoryVM>>(categories);

            return ServiceResponse.OkResponse("Категорії отримано", models);
        }

        public async Task<ServiceResponse> GetByIdAsync(Guid id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return ServiceResponse.BadRequestResponse($"Категорія з id {id} не знайдена");
            }

            var model = _mapper.Map<CategoryVM>(category);

            return ServiceResponse.OkResponse("Категорія знайдена", model);
        }

        public async Task<ServiceResponse> GetByNameAsync(string name)
        {
            var category = await _categoryRepository.GetAsync(c => c.Name == name);

            if (category == null)
            {
                return ServiceResponse.BadRequestResponse($"Категорія з назвою {name} не знайдена");
            }

            var model = _mapper.Map<CategoryVM>(category);

            return ServiceResponse.OkResponse("Категорія знайдена", model);
        }
    }
}

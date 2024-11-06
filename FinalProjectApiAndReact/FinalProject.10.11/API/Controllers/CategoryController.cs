using BLL.Services;
using BLL.Services.CategoryService;
using DAL.ViewModels.ToDos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoryAsync([FromQuery] Guid? id, string? name)
        {
            id = Request.Query.ContainsKey(nameof(id)) ? id : null;
            name = Request.Query.ContainsKey(nameof(name)) ? name : null;

            if (id == null && string.IsNullOrEmpty(name))
            {
                // Повернути всі категорії, якщо не вказано жодних параметрів
                var response = await _categoryService.GetAllAsync();
                return GetResult(response);
            }

            if (id.HasValue)
            {
                // Повернути категорію за id, якщо він вказаний
                var response = await _categoryService.GetByIdAsync(id.Value);
                if (response.Success)
                {
                    return GetResult(response);
                }
            }

            if (!string.IsNullOrEmpty(name))
            {
                // Повернути категорію за назвою, якщо вона вказана
                var response = await _categoryService.GetByNameAsync(name);
                if (response.Success)
                {
                    return GetResult(response);
                }
            }

            return GetResult(ServiceResponse.BadRequestResponse("Не вдалося отримати категорію"));
        }


        [HttpPost]
        public async Task<IActionResult> CreateCategoryAsync([FromBody] CreateUpdateCategoryVM model)
        {
            var response = await _categoryService.CreateAsync(model);
            return GetResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoryAsync(Guid id, [FromBody] CreateUpdateCategoryVM model)
        {
            if (id != model.Id)
            {
                return GetResult(ServiceResponse.BadRequestResponse("ID mismatch"));
            }

            var response = await _categoryService.UpdateAsync(model);
            return GetResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoryAsync(Guid id)
        {
            var response = await _categoryService.DeleteAsync(id);
            return GetResult(response);
        }
    }
}

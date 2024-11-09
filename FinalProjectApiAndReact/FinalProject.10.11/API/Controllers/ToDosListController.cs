using BLL.Services;
using BLL.Services.ToDoListService;
using DAL.ViewModels.ToDos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDosListController : BaseController
    {
        private readonly IToDoListService _toDoListService;

        public ToDosListController(IToDoListService toDoListService)
        {
            _toDoListService = toDoListService;
        }

        [HttpGet]
        public async Task<IActionResult> GetToDoListsAsync([FromQuery] string? userId, Guid? categoryId)
        {
            if (userId == null && categoryId == null)
            {
                var response = await _toDoListService.GetAllAsync();
                return GetResult(response);
            }

            if (!string.IsNullOrEmpty(userId))
            {
                var response = await _toDoListService.GetByUserIdAsync(userId);
                return GetResult(response);
            }

            if (categoryId.HasValue)
            {
                var response = await _toDoListService.GetByCategoryIdAsync(categoryId.Value);
                return GetResult(response);
            }

            return GetResult(ServiceResponse.BadRequestResponse("Invalid query parameters"));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetToDoListByIdAsync(Guid id)
        {
            var response = await _toDoListService.GetByIdAsync(id);
            return GetResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateToDoListAsync([FromBody] CreateUpdateToDoListVM model)
        {
            var response = await _toDoListService.CreateAsync(model);
            return GetResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateToDoListAsync([FromBody] CreateUpdateToDoListVM model)
        {
            var response = await _toDoListService.UpdateAsync(model);
            return GetResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoListAsync(Guid id)
        {
            var response = await _toDoListService.DeleteAsync(id);
            return GetResult(response);
        }
    }
}

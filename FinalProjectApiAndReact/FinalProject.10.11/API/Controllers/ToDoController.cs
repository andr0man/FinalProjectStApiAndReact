using BLL.Services;
using BLL.Services.ToDoService;
using DAL.ViewModels.ToDos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : BaseController
    {
        private readonly IToDoService _toDoService;

        public ToDoController(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetToDosAsync([FromQuery] Guid? toDoListId)
        {
            if (toDoListId == null)
            {
                var response = await _toDoService.GetAllAsync();
                return GetResult(response);
            }

            var responseByList = await _toDoService.GetByToDoListIdAsync(toDoListId.Value);
            return GetResult(responseByList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetToDoByIdAsync(Guid id)
        {
            var response = await _toDoService.GetByIdAsync(id);
            return GetResult(response);
        }

        [HttpPut("Toggle/{id}")]
        public async Task<IActionResult>ToggleCompletion(Guid id, CancellationToken cancellation)
        {
            var response = await _toDoService.ToggleCompletion(id, cancellation);
            return GetResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateToDoAsync([FromBody] CreateUpdateToDoVM model)
        {
            var response = await _toDoService.CreateAsync(model);
            return GetResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateToDoAsync([FromBody] CreateUpdateToDoVM model, CancellationToken cancellation)
        {
            var response = await _toDoService.UpdateAsync(model, cancellation);
            return GetResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoAsync(Guid id)
        {
            var response = await _toDoService.DeleteAsync(id);
            return GetResult(response);
        }
    }
}

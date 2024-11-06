using BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult GetResult(ServiceResponse serviseResponse)
        {
            return StatusCode((int)serviseResponse.StatusCode, serviseResponse);
        }
    }
}

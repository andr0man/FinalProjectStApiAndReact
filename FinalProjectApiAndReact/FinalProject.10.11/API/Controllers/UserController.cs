using BLL.Services;
using BLL.Services.ImageService;
using BLL.Services.UserService;
using DAL;
using DAL.Models.Identity;
using DAL.ViewModels.User;
using BLL.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Roles = $"{Settings.AdminRole}, {Settings.RoleManagerRole}")]
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IImageService _imageService;

        public UserController(UserManager<User> userManager, IUserService userService, IWebHostEnvironment webHostEnvironment, IImageService imageService)
        {
            _userManager = userManager;
            _userService = userService;
            _webHostEnvironment = webHostEnvironment;
            _imageService = imageService;
        }

        [AllowAnonymous] // даний метод не потребує авторизації
        [HttpPost("image")]
        public async Task<IActionResult> AddImageFromUserAsync([FromForm] UserImageVM model)
        {
            if (string.IsNullOrEmpty(model.UserId) || model.Image == null)
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Некоректні дані"));
            }

            var response = await _userService.AddImageFromUserAsync(model);

            return GetResult(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserAsync([FromQuery] string? id, string? email, string? userName)
        {
            id = Request.Query[nameof(id)];
            userName = Request.Query[nameof(userName)];
            email = Request.Query[nameof(email)];

            if (id == null && userName == null && email == null)
            {
                var response = await _userService.GetAllAsync();
                return GetResult(response);
            }

            if (!string.IsNullOrEmpty(id))
            {
                var response = await _userService.GetById(id);
                if (response.Success)
                {
                    return GetResult(response);
                }
            }
            if (!string.IsNullOrEmpty(email))
            {
                var response = await _userService.GetByEmail(email);
                if (response.Success)
                {
                    return GetResult(response);
                }
            }
            if (!string.IsNullOrEmpty(userName))
            {
                var response = await _userService.GetByUserName(userName);
                if (response.Success)
                {
                    return GetResult(response);
                }
            }

            return GetResult(ServiceResponse.BadRequestResponse("Не вдалося отримати користувача"));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return GetResult(ServiceResponse.BadRequestResponse("Невірний формат id"));
            }

            var response = await _userService.DeleteAsync(id);
            return GetResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateUpdateUserVM model)
        {
            var validator = new CreateUserValidator();
            var validateResult = await validator.ValidateAsync(model);

            if (!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }

            var response = await _userService.CreateAsync(model);

            return GetResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync(CreateUpdateUserVM model)
        {
            var validator = new CreateUserValidator();
            var validateResult = await validator.ValidateAsync(model);

            if (!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }

            var response = await _userService.UpdateAsync(model);

            return GetResult(response);
        }

        [HttpPut("addRole")]
        public async Task<IActionResult> AddRoleToUser(AddDeleteUserRoleVM addUserRoleVM)
        {
            var response = await _userService.AddRoleToUser(addUserRoleVM);

            return GetResult(response);
        }

        [HttpPut("deleteRole")]
        public async Task<IActionResult> DeleteRoleFromUser(AddDeleteUserRoleVM addUserRoleVM)
        {
            var response = await _userService.DeleteRoleFromUser(addUserRoleVM);

            return GetResult(response);
        }
    }
}

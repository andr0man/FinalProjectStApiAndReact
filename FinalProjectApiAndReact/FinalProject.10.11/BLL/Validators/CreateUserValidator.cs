﻿using Dashboard.DAL;
using Dashboard.DAL.ViewModels.User;
using FluentValidation;

namespace Dashboard.BLL.Validators
{
    public class CreateUserValidator : AbstractValidator<CreateUpdateUserVM>
    {
        public CreateUserValidator()
        {
            RuleFor(m => m.Email)
                .EmailAddress()
                .WithMessage("Невірний формат пошти")
                .NotEmpty()
                .WithMessage("Вкажіть пошту");
            RuleFor(m => m.UserName)
                .NotEmpty().WithMessage("Вкажіть ім'я користувача");
            RuleFor(m => m.Role)
                .NotEmpty().WithMessage("Вкажіть роль");
        }
    }
}
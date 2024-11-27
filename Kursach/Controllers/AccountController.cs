using Kursach.DTOs;
using Kursach.Exceptions;
using Kursach.Servises.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kursach.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITokenGeneratorService _tokenService;

        public AccountController(IAccountService accountService, ITokenGeneratorService tokenService)
        {
            _accountService = accountService;
            _tokenService = tokenService;
        }

        [Authorize]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordDTO resetRequest)
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"];

                token = token.ToString().Replace("Bearer ", "");

                await _accountService.ResetPaswordAsync(resetRequest, token);
                return Ok("Recovery link sent to your email");
            }
            catch (MyAuthException ex)
            {
                return BadRequest($"{ex.Message}\n{ex.AuthErrorType}");
            }
        }


        [Authorize]
        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmailAsync()
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"];
                token = token.ToString().Replace("Bearer ", "");

                await _accountService.ConfirmEmailAsync(token);

                return Ok();
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("ValidateConfirmation")]
        public async Task<IActionResult> ValidateConfirmationAsync([FromQuery] string token)
        {
            try
            {
                await _tokenService.ValidateEmailTokenAsync(token);

                return Ok("Email confirmed successfully");
            }
            catch
            {
                throw;
            }
        }
    }
}

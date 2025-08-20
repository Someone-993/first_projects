using Kursach_v2.DTOs;
using Kursach_v2.Models;
using Kursach_v2.Services;
using Microsoft.AspNetCore.Mvc;

namespace Kursach_v2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            var user = await _authService.RegisterAsync(dto);
            if (user == null)
                return BadRequest("User with this email already exists");
            var token = _authService.GenerateJwtToken(user);
            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    name = user.UserName,
                    role = user.Role.ToLower() == "superadmin" ? "super_admin" : user.Role.ToLower()
                }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _authService.AuthenticateAsync(dto);
            if (user == null)
                return Unauthorized();
            var token = _authService.GenerateJwtToken(user);
            return Ok(new { token });
        }
    }
}

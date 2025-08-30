using Kursach_v2.DTOs;
using Kursach_v2.Models;
using Kursach_v2.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
            try
            {
                if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                {
                    return BadRequest(new { message = "Name, Email, and Password are required." });
                }
                var userExists = await _authService.UserExistsByEmailAsync(dto.Email);
                if (userExists)
                {
                    return BadRequest(new { message = "User with this email already exists" });
                }
                var user = await _authService.RegisterAsync(dto);
                if (user == null)
                {
                    return BadRequest(new { message = "Invalid registration data" });
                }
                var token = _authService.GenerateJwtToken(user);
                return Ok(new
                {
                    token,
                    user = new
                    {
                        id = user.Id,
                        email = user.Email,
                        name = user.UserName,
                        role = user.Role.ToLower() == "superadmin" ? "super_admin" :
                               user.Role.ToLower() == "visitor" ? "customer" :
                               user.Role.ToLower()
                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Register ERROR] {ex.Message}\n{ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"[Register ERROR - Inner] {ex.InnerException.Message}\n{ex.InnerException.StackTrace}");
                }
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _authService.AuthenticateAsync(dto);
            if (user == null)
                return Unauthorized();
            var token = _authService.GenerateJwtToken(user);
            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    name = user.UserName,
                    role = user.Role.ToLower() == "superadmin" ? "super_admin" :
                           user.Role.ToLower() == "visitor" ? "customer" :
                           user.Role.ToLower()
                }
            });
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
            var name = User.FindFirstValue(ClaimTypes.Name) ?? string.Empty;
            var roleClaim = User.FindFirstValue(ClaimTypes.Role) ?? "Visitor";
            var role = roleClaim.ToLower() == "superadmin" ? "super_admin" : roleClaim.ToLower();

            return Ok(new
            {
                id = string.IsNullOrEmpty(userIdClaim) ? 0 : int.Parse(userIdClaim),
                email,
                name,
                role
            });
        }
    }
}

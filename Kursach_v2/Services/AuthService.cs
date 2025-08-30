using Kursach_v2.DTOs;
using Kursach_v2.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Kursach_v2.Services
{
    public class AuthService
    {
        private readonly RestaurantNetworkContext _context;
        private readonly IConfiguration _config;

        public AuthService(RestaurantNetworkContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<bool> UserExistsByEmailAsync(string? email)
        {
            if (string.IsNullOrWhiteSpace(email)) return false;
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<User?> RegisterAsync(RegisterDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password) || string.IsNullOrWhiteSpace(dto.Name))
                return null;
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return null;
            var user = new User
            {
                UserName = dto.Name ?? string.Empty,
                Email = dto.Email ?? string.Empty,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password ?? string.Empty),
                Role = string.IsNullOrEmpty(dto.Role) ? "Visitor" :
                    (dto.Role!.ToLower() == "admin" ? "Admin" :
                    (dto.Role.ToLower() == "super_admin" ? "SuperAdmin" : "Visitor"))
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> AuthenticateAsync(LoginDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;
            return user;
        }

        public string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

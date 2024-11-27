﻿using Kursach.Contexts;
using Kursach.Exceptions;
using Kursach.Models;
using Kursach.Servises.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Kursach.Servises.Classes
{
    public class TokenGeneratorService : ITokenGeneratorService
    {
        private readonly IConfiguration _config;
        private readonly RestaurantNetworkContext _context;

        public TokenGeneratorService(IConfiguration config, RestaurantNetworkContext context)
        {
            _config = config;
            _context = context;
        }

        public async Task<string> GenerateEmailTokenAsync(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Convert.FromBase64String(_config.GetSection("EmailJwt:Key").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.NameIdentifier, userId)
            }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                Issuer = _config.GetSection("EmailJwt:Issuer").Value,
                Audience = _config.GetSection("EmailJwt:Audience").Value,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            string tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        public async Task<string> GenerateRefreshTokenAsync()
        {
            return Guid.NewGuid().ToString();
        }

        public async Task<string> GenerateTokenAsync(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Role, "appuser"),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));

            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }

        public ClaimsPrincipal GetPrincipalFromToken(string token, bool validateLifetime = false)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value)),
                ValidateLifetime = validateLifetime
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken securityToken;

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals("http://www.w3.org/2001/04/xmldsig-more#hmac-sha256"))
                throw new SecurityTokenException("Invalid token");
            return principal;
        }

        public async Task ValidateEmailTokenAsync(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Convert.FromBase64String(_config.GetSection("EmailJwt:Key").Value);
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _config.GetSection("EmailJwt:Issuer").Value,
                ValidAudience = _config.GetSection("EmailJwt:Audience").Value,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            try
            {
                var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

                var Id = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == Id);

                if (user == null)
                {
                    throw new MyAuthException(AuthErrorTypes.UserNotFound, "User not found");
                }


                if (user.IsEmailConfirmed)
                {
                    throw new MyAuthException(AuthErrorTypes.EmailAlreadyConfirmed, "Email already confirmed");
                }

                user.IsEmailConfirmed = true;

                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}

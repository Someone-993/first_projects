using Kursach.Contexts;
using Kursach.DTOs;
using Kursach.Exceptions;
using Kursach.Servises.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using static BCrypt.Net.BCrypt;

namespace Kursach.Servises.Classes
{
    public class AccountService : IAccountService
    {
        private readonly IEmailSenderService _emailSenderService;
        private readonly ITokenGeneratorService _tokenService;
        private readonly RestaurantNetworkContext _context;

        public AccountService(IEmailSenderService emailSender, ITokenGeneratorService tokenService, RestaurantNetworkContext context)
        {
            _emailSenderService = emailSender;
            _tokenService = tokenService;
            _context = context;
        }

        public async Task ConfirmEmailAsync(string token)
        {
            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
            {
                throw new MyAuthException(AuthErrorTypes.UserNotFound, "User not found");
            }


            var confirmationToken = await _tokenService.GenerateEmailTokenAsync(user.Id.ToString());

            var link = $"http://localhost:5021/api/v1/Account/ValidateConfirmation?token={confirmationToken}";


            StringBuilder sb = new(File.ReadAllText("C:/Users/abba_rh5j/Desktop/Kursach/Kursach/assets/email.html"));

            sb.Replace("[Confirmation Link]", link);
            sb.Replace("[Year]", DateTime.Now.Year.ToString());
            sb.Replace("[Recipient's Name]", user.Username);
            sb.Replace("[Your Company Name]", "JWT Identity");

            await _emailSenderService.SendEmailAsync(user.Email, "Email confirmation", sb.ToString(), isHtml: true);
        }

        public async Task ResetPaswordAsync(ResetPasswordDTO resetRequest, string token)
        {

            var principal = _tokenService.GetPrincipalFromToken(token, validateLifetime: true);

            var username = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                throw new MyAuthException(AuthErrorTypes.UserNotFound, "User not found");
            }

            if (!Verify(resetRequest.OldPassword, user.PasswordHash))
            {
                throw new MyAuthException(AuthErrorTypes.InvalidCredentials, "Invalid credentials");
            }

            if (resetRequest.NewPassword != resetRequest.ConfirmNewPassword)
            {
                throw new MyAuthException(AuthErrorTypes.PasswordMismatch, "Passwords do not match");
            }

            user.PasswordHash = HashPassword(resetRequest.NewPassword);

            await _emailSenderService.SendEmailAsync(user.Email, "Password Reset", "Your password has been reset");

            await _context.SaveChangesAsync();
        }
    }
}

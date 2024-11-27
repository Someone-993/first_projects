namespace Kursach.Servises.Interfaces
{
    public interface IEmailSenderService
    {
        public Task SendEmailAsync(string email, string subject, string message, FileInfo[] attachments = null, bool isHtml = false);
    }
}

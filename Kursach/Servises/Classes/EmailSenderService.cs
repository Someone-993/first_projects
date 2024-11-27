﻿using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net.Mail;
using System.Net;
using Kursach.Servises.Interfaces;
using Kursach.DTOs;

namespace Kursach.Servises.Classes
{
    public class EmailSenderService : IEmailSenderService
    {
        private readonly IConfiguration _configuration;
        private readonly SmtpClient _smtpClient;
        private readonly string _from;
        public EmailSenderService(IConfiguration configuration)
        {
            _configuration = configuration;
            _from = configuration["Email:Username"];
            _smtpClient = new SmtpClient(_configuration["Email:Host"])
            {
                Port = int.Parse(_configuration["Email:Port"]),
                Credentials = new NetworkCredential(_configuration["Email:Username"], _configuration["Email:Password"]),
                EnableSsl = true
            };
        }

        public async Task SendEmailAsync(string email, string subject, string message, FileInfo[] attachments = null, bool isHtml = false)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_from),
                Subject = subject,
                Body = message,
                IsBodyHtml = isHtml
            };

            mailMessage.To.Add(email);

            if (attachments != null)
            {
                foreach (var attachment in attachments)
                {
                    mailMessage.Attachments.Add(new Attachment(attachment.FullName));
                }
            }

            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}
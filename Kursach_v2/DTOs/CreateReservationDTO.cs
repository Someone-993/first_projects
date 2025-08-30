using System.ComponentModel.DataAnnotations;

namespace Kursach_v2.DTOs
{
    public class CreateReservationDTO
    {
        [Required]
        public int TableId { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public int Guests { get; set; }
        public string? SpecialRequests { get; set; }
    }
}

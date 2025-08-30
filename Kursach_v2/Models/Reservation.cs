using System;

namespace Kursach_v2.Models
{
    public class Reservation
    {
        public Reservation()
        {
            // Initialize navigation properties to avoid null reference issues
        }
        
        public int Id { get; set; }
        public int TableId { get; set; }
        public Table Table { get; set; } = null!;
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public DateTime Date { get; set; }
        public int GuestsCount { get; set; }
    }
}

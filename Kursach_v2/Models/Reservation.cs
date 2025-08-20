using System;

namespace Kursach_v2.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public Table Table { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime Date { get; set; }
        public int GuestsCount { get; set; }
    }
}

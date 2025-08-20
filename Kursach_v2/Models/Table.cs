namespace Kursach_v2.Models
{
    public class Table
    {
        public int Id { get; set; }
        public int Seats { get; set; }
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}

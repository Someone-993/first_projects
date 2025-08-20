namespace Kursach_v2.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; } // Visitor, Admin, SuperAdmin
        public ICollection<Reservation> Reservations { get; set; }
    }
}

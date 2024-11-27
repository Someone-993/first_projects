namespace Kursach.Models
{
    public class Staff
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
    }
}

namespace Kursach.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }
}

namespace Kursach_v2.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public ICollection<Table> Tables { get; set; }
        public ICollection<Staff> Staff { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}

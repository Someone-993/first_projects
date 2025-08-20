using Microsoft.EntityFrameworkCore;
using Kursach_v2.Models;

namespace Kursach_v2
{
    public class RestaurantNetworkContext : DbContext
    {
        public RestaurantNetworkContext(DbContextOptions<RestaurantNetworkContext> options) : base(options) { }

        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Дополнительная конфигурация при необходимости
        }
    }
}

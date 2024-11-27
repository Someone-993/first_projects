using Kursach.Models;
using Microsoft.EntityFrameworkCore;

namespace Kursach.Contexts
{
    public class RestaurantNetworkContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public RestaurantNetworkContext()
        {

        }

        public RestaurantNetworkContext(DbContextOptions<RestaurantNetworkContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var userEntity = modelBuilder.Entity<User>();

            userEntity
                .Property(r => r.RefreshTokenExpiryTime).HasColumnType("datetime2");

            userEntity
                .HasKey(u => u.Id);

            userEntity
                .Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);
            
            userEntity
                .HasIndex(u => u.Username)
                .IsUnique();

            userEntity
                .Property(u => u.PasswordHash)
                .IsRequired();
        }
    }
}

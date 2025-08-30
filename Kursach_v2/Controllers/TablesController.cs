using Kursach_v2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kursach_v2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TablesController : ControllerBase
    {
        private readonly RestaurantNetworkContext _context;
        public TablesController(RestaurantNetworkContext context)
        {
            _context = context;
        }

        [HttpGet("by-restaurant/{restaurantId}")]
        public async Task<IActionResult> GetByRestaurant(int restaurantId)
        {
            var tables = await _context.Tables.Where(t => t.RestaurantId == restaurantId).ToListAsync();
            return Ok(tables);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var tables = await _context.Tables.ToListAsync();
            return Ok(tables);
        }

        [HttpPost("seed-test-data")]
        public async Task<IActionResult> SeedTestData()
        {
            try
            {
                // Check if we already have data
                if (await _context.Tables.AnyAsync())
                {
                    return BadRequest("Test data already exists");
                }

                // Create a test restaurant if it doesn't exist
                var restaurant = await _context.Restaurants.FirstOrDefaultAsync();
                if (restaurant == null)
                {
                    restaurant = new Restaurant
                    {
                        Name = "Test Restaurant",
                        Address = "123 Test Street",
                        Description = "A test restaurant for development"
                    };
                    _context.Restaurants.Add(restaurant);
                    await _context.SaveChangesAsync();
                }

                // Create test tables
                var testTables = new[]
                {
                    new Table { Seats = 2, RestaurantId = restaurant.Id },
                    new Table { Seats = 4, RestaurantId = restaurant.Id },
                    new Table { Seats = 6, RestaurantId = restaurant.Id },
                    new Table { Seats = 8, RestaurantId = restaurant.Id }
                };

                _context.Tables.AddRange(testTables);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Test data created successfully", tables = testTables });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to create test data", error = ex.Message });
            }
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> Create(Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetByRestaurant), new { restaurantId = table.RestaurantId }, table);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Table table)
        {
            if (id != table.Id) return BadRequest();
            _context.Entry(table).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var table = await _context.Tables.FindAsync(id);
            if (table == null) return NotFound();
            _context.Tables.Remove(table);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

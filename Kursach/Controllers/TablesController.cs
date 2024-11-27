using Kursach.Contexts;
using Kursach.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kursach.Controllers
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

        [HttpGet("{restaurantId}")]
        public async Task<ActionResult<IEnumerable<Table>>> GetTablesByRestaurant(int restaurantId)
        {
            var tables = await _context.Tables.Where(t => t.RestaurantId == restaurantId).ToListAsync();
            return tables;
        }

        [HttpPost]
        public async Task<ActionResult<Table>> AddTable(Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTablesByRestaurant), new { restaurantId = table.RestaurantId }, table);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTable(int id, Table updatedTable)
        {
            if (id != updatedTable.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedTable).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable(int id)
        {
            var table = await _context.Tables.FindAsync(id);
            if (table == null)
            {
                return NotFound();
            }

            _context.Tables.Remove(table);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

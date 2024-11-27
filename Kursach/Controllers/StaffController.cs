using Kursach.Contexts;
using Kursach.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kursach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : ControllerBase
    {
        private readonly RestaurantNetworkContext _context;

        public StaffController(RestaurantNetworkContext context)
        {
            _context = context;
        }

        [HttpGet("{restaurantId}")]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaffByRestaurant(int restaurantId)
        {
            var staff = await _context.Staff.Where(s => s.RestaurantId == restaurantId).ToListAsync();
            return staff;
        }

        [HttpPost]
        public async Task<ActionResult<Staff>> AddStaff(Staff staff)
        {
            _context.Staff.Add(staff);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStaffByRestaurant), new { restaurantId = staff.RestaurantId }, staff);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaff(int id, Staff updatedStaff)
        {
            if (id != updatedStaff.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedStaff).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var staff = await _context.Staff.FindAsync(id);
            if (staff == null)
            {
                return NotFound();
            }

            _context.Staff.Remove(staff);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

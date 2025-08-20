using Kursach_v2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Kursach_v2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly RestaurantNetworkContext _context;
        public ReservationsController(RestaurantNetworkContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("by-user")]
        public async Task<IActionResult> GetByUser()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var reservations = await _context.Reservations.Include(r => r.Table).Where(r => r.UserId == userId).ToListAsync();
            return Ok(reservations);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(Reservation reservation)
        {
            reservation.UserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetByUser), new { }, reservation);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);
            if (reservation == null) return NotFound();
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

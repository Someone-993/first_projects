using Kursach_v2.Models;
using Kursach_v2.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.ComponentModel.DataAnnotations;

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
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { message = "Invalid user token" });
            }
            
            var reservations = await _context.Reservations.Include(r => r.Table).Where(r => r.UserId == userId).ToListAsync();
            return Ok(reservations);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateReservationDTO dto)
        {
            try
            {
                Console.WriteLine($"[Reservation] Starting reservation creation...");
                Console.WriteLine($"[Reservation] Received DTO: TableId={dto.TableId}, Date={dto.Date}, Time={dto.Time}, Guests={dto.Guests}");
                
                var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                Console.WriteLine($"[Reservation] User claim: {userIdClaim}");
                
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    Console.WriteLine($"[Reservation] Invalid user token: {userIdClaim}");
                    return Unauthorized(new { message = "Invalid user token" });
                }

                Console.WriteLine($"[Reservation] User ID: {userId}");

                if (!DateTime.TryParse($"{dto.Date} {dto.Time}", out DateTime reservationDateTime))
                {
                    Console.WriteLine($"[Reservation] Date parse failed: {dto.Date} {dto.Time}");
                    return BadRequest(new { message = "Invalid date or time format" });
                }

                Console.WriteLine($"[Reservation] Parsed DateTime: {reservationDateTime}");

                if (reservationDateTime < DateTime.Now)
                {
                    Console.WriteLine($"[Reservation] Date in past: {reservationDateTime} < {DateTime.Now}");
                    return BadRequest(new { message = "Reservation date cannot be in the past" });
                }

                Console.WriteLine($"[Reservation] Looking for table with ID: {dto.TableId}");
                var table = await _context.Tables.FindAsync(dto.TableId);
                if (table == null)
                {
                    Console.WriteLine($"[Reservation] Table not found: {dto.TableId}");
                    return BadRequest(new { message = "Table not found" });
                }

                Console.WriteLine($"[Reservation] Found table: {table.Id}, Seats: {table.Seats}");

                if (dto.Guests > table.Seats)
                {
                    Console.WriteLine($"[Reservation] Guests exceed capacity: {dto.Guests} > {table.Seats}");
                    return BadRequest(new { message = "Number of guests exceeds table capacity" });
                }

                Console.WriteLine($"[Reservation] Creating reservation object...");
                var reservation = new Reservation
                {
                    TableId = dto.TableId,
                    UserId = userId,
                    Date = reservationDateTime,
                    GuestsCount = dto.Guests
                };

                Console.WriteLine($"[Reservation] Adding to context...");
                _context.Reservations.Add(reservation);
                
                Console.WriteLine($"[Reservation] Saving changes...");
                await _context.SaveChangesAsync();

                Console.WriteLine($"[Reservation] Successfully created reservation ID: {reservation.Id}");
                return CreatedAtAction(nameof(GetByUser), new { }, reservation);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Reservation] Exception: {ex.Message}");
                Console.WriteLine($"[Reservation] Stack trace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"[Reservation] Inner exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { message = "Internal server error", details = ex.Message });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { message = "Invalid user token" });
            }
            
            var reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);
            if (reservation == null) return NotFound();
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

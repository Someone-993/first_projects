namespace Kursach_v2.DTOs
{
    public class RegisterDTO
    {
    public string? Name { get; set; } // для совместимости с фронтом
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? Role { get; set; } // для совместимости с фронтом
    }
}

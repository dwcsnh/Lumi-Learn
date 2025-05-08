using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Auth;
using LumiLearn.Dtos.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;
        public AuthController(LumiLearnDbContext lumiLearnDbContext)
        {
            dbContext = lumiLearnDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var users = await dbContext.Users.ToListAsync();

            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginRespone>> Login(LoginRequest request)
        {
            if (request.Username == null || request.Password == null)
            {
                return BadRequest("Missing username or password");
            }

            var user = await dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return NotFound("Username doesn't exist");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Wrong Password!");
            }

            var authToken = GenerateJwtToken(user);

            return Ok(new LoginRespone
            {
                User = new UserDto
                {
                    Id = user.Id,
                    Role = user.Role.Name, // Remember to Include Navigation Properties
                    Email = user.Email,
                    Phone = user.Phone,
                    Birthday = user.Birthday,
                    Name = user.Name,
                    Username = user.Username
                },
                AuthToken = authToken
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterRespone>> Register(RegisterRequest request)
        {
            var role = await dbContext.Roles.FirstOrDefaultAsync(r => r.Name == request.Role.ToString());

            if (role == null)
            {
                return BadRequest("Invalid Role");
            }

            if (request.Username == null || request.Password == null)
            {
                return BadRequest("Missing username or password");
            }

            var existingUser = await dbContext.Users
                                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (existingUser != null)
            {
                return Conflict("Username already exists");
            }


            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username,
                RoleId = role.Id,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            };

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            var authToken = GenerateJwtToken(user);
            return Ok(new RegisterRespone
            {
                User = new UserDto
                {
                    Id = user.Id,
                    Role = user.Role.Name,
                    Email = user.Email,
                    Phone = user.Phone,
                    Birthday = user.Birthday,
                    Name = user.Name,
                    Username = user.Username
                },
                AuthToken = authToken
            });
        }


        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                //new Claim(JwtRegisteredClaimNames.Sub, user.Username), // Owner
                //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // JWT Id
                new Claim(ClaimTypes.Role, user.Role.Name),
                new Claim(ClaimTypes.Name, user.Username), // Now we use it haha
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) // User Id
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("lumiLearn_super_super_superSecret_key")); // same in Progam.cs
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); // HmacSha256 need key > 32 characters

            var token = new JwtSecurityToken(
                issuer: "lumiLearn.com", // same in Program.cs
                audience: "lumiLearn.com",
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

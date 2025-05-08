using LumiLearn.Data;
using LumiLearn.Dtos.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;
        public NotificationsController(LumiLearnDbContext lumiLearnDbContext)
        {
            dbContext = lumiLearnDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetMyNotifications()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var notifications = await dbContext.NotificationUsers
                .Where(nu => nu.UserId == userId)
                .Include(nu => nu.Notification)
                .Select(nu => new UserNotification
                {
                    NotificationId = nu.NotificationId,
                    Content = nu.Notification.Content,
                    Type = nu.Notification.Type,
                    IsRead = nu.IsRead,
                    CreatedAt = nu.Notification.CreatedAt,
                    Thumbnail = nu.Notification.Thumbnail,
                })
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpPatch("{notificationId}/read")]
        public async Task<IActionResult> MarkNotificationAsRead(Guid notificationId)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var notificationUser = await dbContext.NotificationUsers
                .FirstOrDefaultAsync(nu => nu.UserId == userId && nu.NotificationId == notificationId);

            if (notificationUser == null)
            {
                return NotFound();
            }

            notificationUser.IsRead = true;
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("read-all")]
        public async Task<IActionResult> MarkAllNotificationsAsRead()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var notifications = await dbContext.NotificationUsers
                .Where(nu => nu.UserId == userId && !nu.IsRead)
                .ToListAsync();

            if (!notifications.Any())
            {
                return NoContent();
            }

            foreach (var notification in notifications)
            {
                notification.IsRead = true;
            }

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteNotification(Guid id)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var notificationUser = await dbContext.NotificationUsers
                .FirstOrDefaultAsync(nu => nu.UserId == userId && nu.NotificationId == id);

            if (notificationUser == null)
            {
                return NotFound();
            }

            dbContext.NotificationUsers.Remove(notificationUser);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("delete-all")]
        public async Task<IActionResult> DeleteAllNotifications()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var notifications = await dbContext.NotificationUsers
                .Where(nu => nu.UserId == userId)
                .ToListAsync();

            if (!notifications.Any())
            {
                return NoContent();
            }

            dbContext.NotificationUsers.RemoveRange(notifications);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

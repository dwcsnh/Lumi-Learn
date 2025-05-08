namespace LumiLearn.Dtos.Notification
{
    public class UserNotification
    {
        public Guid NotificationId { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsRead { get; set; }
        public string? Thumbnail { get; set; }
    }
}

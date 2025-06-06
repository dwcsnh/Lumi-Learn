﻿using System.Text.Json.Serialization;

namespace LumiLearn.Domains
{
    public class User
    {
        public Guid Id { get; set; }
        public Guid RoleId { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Name { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public Role Role { get; set; }

        public ICollection<Course> CourseTaughts { get; set; } // Teacher
        public ICollection<Enrollment> Enrollments { get; set; } // Student
        public ICollection<Feedback> FeedBacks { get; set; } // Maybe both ?? or just Student
        public ICollection<QuizResult> QuizResults { get; set; } // Student
        public ICollection<NotificationUser> NotificationUsers { get; set; } // Student ?
        public ICollection<SearchHistory> SearchHistories { get; set; }
    }
}

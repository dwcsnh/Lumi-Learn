using LumiLearn.Dtos.Lesson;

namespace LumiLearn.Dtos.Course
{
    public class CourseDto
    {
        public Guid Id { get; set; }
        public string Instructor { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Thumbnail { get; set; }
        public string Topic { get; set; }
        public double Rating { get; set; }
        public int NumberOfRatings { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsUserEnrolled { get; set; } = false;
    }
}

using LumiLearn.Dtos.Lesson;

namespace LumiLearn.Dtos.Course
{
    public class CourseOverview
    {
        public Guid Id { get; set; }
        public string Instructor { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Thumbnail { get; set; }
        public string Topic { get; set; }
        public double Rating { get; set; }
        public int NumberOfRatings { get; set; }
        public bool IsUserEnrolled { get; set; } = false;
        public IEnumerable<LessonOverview> Lessons { get; set; }
    }
}

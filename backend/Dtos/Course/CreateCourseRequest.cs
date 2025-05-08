namespace LumiLearn.Dtos.Course
{
    public class CreateCourseRequest
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public IFormFile? Thumbnail {  get; set; }
        public string Topic { get; set; }
    }
}

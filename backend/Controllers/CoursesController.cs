using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Course;
using LumiLearn.Dtos.FlashcardSet;
using LumiLearn.Dtos.Lesson;
using LumiLearn.Dtos.Quiz;
using LumiLearn.Dtos.FlashcardSet;
using LumiLearn.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using LumiLearn.Dtos.Quiz;
using LumiLearn.Services;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Net.Mime;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;
        private readonly ISearchHistoriesReposity searchHistoriesReposity;
        private readonly S3Services s3Services;

        public CoursesController(LumiLearnDbContext lumiLearnDbContext, ISearchHistoriesReposity searchHistoriesReposity, S3Services s3Services)
        {
            dbContext = lumiLearnDbContext;
            this.searchHistoriesReposity = searchHistoriesReposity;
            this.s3Services = s3Services;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var enrolledCourseIds = await dbContext.Enrollments
                .Where(e => e.StudentId == userId)
                .Select(e => e.CourseId)
                .ToListAsync();

            var courses = await dbContext.Courses
                .Select(c => new CourseDto
                {
                    Id = c.Id,
                    Instructor = c.Instructor.Name ?? c.Instructor.Username,
                    Title = c.Title,
                    Description = c.Description,
                    Thumbnail = c.Thumbnail,
                    Topic = c.Topic.Name,
                    Rating = c.Feedbacks.Any() ? Math.Round(c.Feedbacks.Average(f => f.Rating), 2) : 0,
                    NumberOfRatings = c.Feedbacks.Count,
                    Timestamp = c.Timestamp,
                    IsUserEnrolled = enrolledCourseIds.Contains(c.Id),
                })
                .ToListAsync();

            return Ok(courses);
        }

        [HttpGet("Overview/{id:Guid}")]
        public async Task<ActionResult<CourseOverview>> GetCourseOverview(Guid id)
        {
            var course = await dbContext.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            var instructor = await dbContext.Users.FindAsync(course.InstructorId);
            var topic = await dbContext.Topics.FindAsync(course.TopicId);
            var feedbacks = await dbContext.Feedbacks.Where(f => f.CourseId == id).Select(f => f.Rating).ToListAsync();
            var lessons = await dbContext.Lessons.Where(l => l.CourseId == id).ToListAsync();

            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var isEnrolledCourse = await dbContext.Enrollments
                .FirstOrDefaultAsync(e => e.StudentId == userId && e.CourseId == id);

            var lessonsOverview = new List<LessonOverview>();

            foreach(var lesson in lessons)
            {
                var quizzes = await dbContext.Quizzes.Where(q => q.LessonId == lesson.Id)
                    .Select(q => new QuizzOverview
                    {
                        Id = q.Id,
                        LessonId = q.LessonId,
                        Title = q.Title,
                    }).ToListAsync();

                var flashcardSets = await dbContext.FlashCardSets.Where(fs => fs.LessonId == lesson.Id)
                    .Select(fs => new FlashcardSetOverview
                    {
                        Id = fs.Id,
                        LessonId = fs.LessonId,
                        Title = fs.Title,
                    }).ToListAsync();

                var lessonOverview = new LessonOverview
                {
                    Id = lesson.Id,
                    CourseId = lesson.CourseId,
                    Title = lesson.Title,
                    FlashcardSets = flashcardSets,
                    Quizzes = quizzes,
                };

                lessonsOverview.Add(lessonOverview);
            }

            var result = new CourseOverview
            {
                Id = course.Id,
                Instructor = instructor.Name ?? instructor.Username,
                Title = course.Title,
                Description = course.Description,
                Thumbnail = course.Thumbnail,
                Topic = topic.Name,
                Rating = feedbacks.Count() > 0 ? Math.Round(feedbacks.Average(), 2) : 0,
                NumberOfRatings = feedbacks.Count(),
                IsUserEnrolled = isEnrolledCourse != null,
                Lessons = lessonsOverview
            };

            return Ok(result);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<CourseDto>> GetCourseDetail(Guid id)
        {
            var course = await dbContext.Courses
                .Where(c => c.Id == id)
                .Select(c => new CourseDto
                {
                    Id = c.Id,
                    Instructor = c.Instructor.Name ?? c.Instructor.Username,
                    Title = c.Title,
                    Description = c.Description,
                    Thumbnail = c.Thumbnail,
                    Topic = c.Topic.Name,
                    Rating = c.Feedbacks.Any() ? Math.Round(c.Feedbacks.Average(f => f.Rating), 2) : 0,
                    NumberOfRatings = c.Feedbacks.Count,
                    Timestamp = c.Timestamp,
                })
                .FirstOrDefaultAsync();

            if(course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        // Get My Course ? Teacher ? Student -> Role
        [HttpGet("mine")]
        [Authorize]
        public async Task<ActionResult<List<CourseDto>>> GetMyCourses()
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            if (role == "Student")
            {

                var coursesDto = await dbContext.Enrollments
                    .Where(e => e.StudentId == userId)
                    .Select(e => new CourseDto
                    {
                        Id = e.Course.Id,
                        Instructor = e.Course.Instructor.Name ?? e.Course.Instructor.Username,
                        Title = e.Course.Title,
                        Description = e.Course.Description,
                        Thumbnail = e.Course.Thumbnail,
                        Topic = e.Course.Topic.Name,
                        Rating = e.Course.Feedbacks.Any() ? Math.Round(e.Course.Feedbacks.Average(f => f.Rating), 2) : 0,
                        NumberOfRatings = e.Course.Feedbacks.Count,
                        Timestamp = e.Course.Timestamp,
                        IsUserEnrolled = true,
                    })
                    .ToListAsync();

                return Ok(coursesDto);
            }
            else if (role == "Teacher")
            {
                var coursesDto = await dbContext.Courses
                    .Where(c => c.InstructorId == userId)
                    .Select(c => new CourseDto
                    {
                        Id = c.Id,
                        Instructor = c.Instructor.Name ?? c.Instructor.Username,
                        Title = c.Title,
                        Description = c.Description,
                        Thumbnail = c.Thumbnail,
                        Topic = c.Topic.Name,
                        Rating = c.Feedbacks.Any() ? Math.Round(c.Feedbacks.Average(f => f.Rating), 2) : 0,
                        NumberOfRatings = c.Feedbacks.Count,
                        Timestamp = c.Timestamp,
                        IsUserEnrolled = true, // This course is belong to this user (teacher)
                    })
                    .ToListAsync();

                return Ok(coursesDto);
            }

            return Forbid();
        }

        /*[HttpGet("search")]
        [Authorize]
        public async Task<ActionResult<ListCourseRespone>> SearchCourses(string keyword, int page = 1, int pageSize = 10)
        {
            IQueryable<Course> query = dbContext.Courses;

            if (string.IsNullOrEmpty(keyword))
            {
                return BadRequest("Search field cannot be null");
            }

            query = query.Where(c => c.Title.ToLower().Contains(keyword.ToLower()));
            var totalResults = await query.CountAsync();

            int totalPages = (int)Math.Ceiling((double)totalResults / pageSize);
            // Nên làm kiểu gì ở đây nhỉ ? Hay lại chia mỗi cái filter 1 request ?? Khá tốn kém vì frontend có thể làm điều đấy cho nhanh
            // Trả về rating các thứ rồi, nhưng lại có page và pageSize ? Có nên trả về tất cả rồi phân trang ở frontend ?
            // Phân trang ở fe thì khi đổi filter các thứ cũng sẽ là tức thời chứ không phải gửi req (bởi vì vẫn là các Course đấy)
            var courses = await query.Skip((page - 1) * (pageSize))
                 .Take(pageSize)
                 .Select(c => new CourseDto
                 {
                     Id = c.Id,
                     Instructor = c.Instructor.Name ?? c.Instructor.Username,
                     Title = c.Title,
                     Description = c.Description,
                     Thumbnail = c.Thumbnail,
                     Topic = c.Topic.Name,
                     Rating = c.Feedbacks.Any() ? Math.Round(c.Feedbacks.Average(f => f.Rating), 2) : 0,
                     NumberOfRatings = c.Feedbacks.Count,
                     Timestamp = c.Timestamp,
                 })
                 .ToListAsync();

            // Add to Search Histories
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            _ = Task.Run(async () =>
            {
                await searchHistoriesReposity.CreateSearchHistory(
                    userId,
                    keyword
                );
            }).ConfigureAwait(false);

            return Ok(new ListCourseRespone
            {
                Courses = courses,
                Page = page,
                PageSize = 10,
                TotalPages = totalPages,
                TotalCourses = totalResults
            });
        }*/

        // Search Course By Title and Filter ?
        [HttpGet("search")]
        [Authorize]
        public async Task<ActionResult<List<CourseDto>>> SearchCourses(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                return BadRequest("Search field cannot be null");
            }

            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var enrolledCourseIds = await dbContext.Enrollments
                .Where(e => e.StudentId == userId)
                .Select(e => e.CourseId)
                .ToListAsync();

            var courseDtos = await dbContext.Courses
                .Where(c => c.Title.ToLower().Contains(keyword.ToLower())) // Handle at frontend
                .Select(c => new CourseDto
                {
                    Id = c.Id,
                    Instructor = c.Instructor.Name ?? c.Instructor.Username,
                    Title = c.Title,
                    Description = c.Description,
                    Thumbnail = c.Thumbnail,
                    Topic = c.Topic.Name,
                    Rating = c.Feedbacks.Any() ? Math.Round(c.Feedbacks.Average(f => f.Rating), 2) : 0,
                    NumberOfRatings = c.Feedbacks.Count,
                    Timestamp = c.Timestamp,
                    IsUserEnrolled = enrolledCourseIds.Contains(c.Id)
                })
                .ToListAsync();

            // Add to Search Histories
            _ = Task.Run(async () =>
            {
                await searchHistoriesReposity.CreateSearchHistory(
                    userId,
                    keyword
                );
            }).ConfigureAwait(false);

            return Ok(courseDtos);
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        public async Task<ActionResult<CourseDto>> CreateNewCourse(CreateCourseRequest request)
        {
            if (request.Thumbnail.Length == 0 || request.Thumbnail == null)
            {
                return BadRequest(request.Thumbnail.Length);
            }
            if (request.Topic == null || request.Title == null)
            {
                return BadRequest(request); // No need because request required
            }

            // Check the Unique InstructorId and Title

            var instructorId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var existCourse = await dbContext.Courses
                .AnyAsync(c => c.InstructorId == instructorId && c.Title == request.Title);

            if (existCourse)
            {
                return Conflict("You already create course with this title!");
            }

            var topic = await dbContext.Topics.FirstOrDefaultAsync(r => r.Name == request.Topic);

            if (topic == null)
            {
                topic = new Topic
                {
                    Id = Guid.NewGuid(),
                    Name = request.Topic
                };
                await dbContext.Topics.AddAsync(topic);
            }

            var newCourseId = Guid.NewGuid();
            string key = $"course/{newCourseId}";

            using var stream = new MemoryStream();
            await request.Thumbnail.CopyToAsync(stream);
            stream.Position = 0;
            var uploadRespone = await s3Services.UploadFileAsync(stream, key, request.Thumbnail.ContentType);

            var course = new Course
            {
                Id = newCourseId,
                InstructorId = instructorId,
                Title = request.Title,
                Description = request.Description,
                Thumbnail = uploadRespone.FileURL,
                TopicId = topic.Id,
                Timestamp = DateTime.Now,
            };

            await dbContext.Courses.AddAsync(course);
            await dbContext.SaveChangesAsync();

            var instructor = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == instructorId);

            var courseDto = new CourseDto
            {
                Id = course.Id,
                Instructor = instructor.Name ?? instructor.Username,
                Title = course.Title,
                Description = course.Description,
                Thumbnail = course.Thumbnail,
                Topic = topic.Name,
                Rating = 0,
                NumberOfRatings = 0,
                Timestamp = course.Timestamp,
            };

            return CreatedAtAction(nameof(GetCourseDetail), new { id = course.Id }, courseDto);
        }

        [HttpPatch("{id:Guid}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> UpdateCourse(Guid id, UpdateCourseRequest request)
        {
            if (request.Title == null &&
               request.Description == null &&
               request.Thumbnail == null &&
               request.Topic == null)
            {
                return BadRequest("Nothing to change!"); // Handle at frontend not to call
            }

            var course = await dbContext.Courses
                .Include(c => c.Topic)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return NotFound();
            }

            // Check permission 
            // Frontend cannot show delete button of others instructor
            // But they could do something like postman to delete it
            var instructorId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (instructorId != course.InstructorId)
            {
                return Forbid("You don't have permission to update this course");
            }

            if (request.Title != null && request.Title != course.Title)
            {
                course.Title = request.Title;
            }

            if (request.Description != null && request.Description != course.Description)
            {
                course.Description = request.Description;
            }

            string key = $"course/{id}";
            using var stream = new MemoryStream();
            await request.Thumbnail.CopyToAsync(stream);
            var uploadRespone = await s3Services.UploadFileAsync(stream, key, request.Thumbnail.ContentType);

            if (request.Thumbnail != null && uploadRespone.FileURL != course.Thumbnail)
            {
                course.Thumbnail = uploadRespone.FileURL;
            }

            if (request.Topic != null && request.Topic != course.Topic.Name)
            {
                var topic = await dbContext.Topics.FirstOrDefaultAsync(t => t.Name == request.Topic);
                if (topic == null)
                {
                    topic = new Topic
                    {
                        Id = Guid.NewGuid(),
                        Name = request.Topic
                    };
                    await dbContext.Topics.AddAsync(topic);
                }
                course.TopicId = topic.Id;
            }
            course.Timestamp = DateTime.Now;

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:Guid}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> DeleteCourse(Guid id)
        {
            var course = await dbContext.Courses.FirstOrDefaultAsync(c => c.Id == id);
            if(course == null)
            {
                return BadRequest("Course Id doesn't exist");
            }

            // Check Permisson
            var instructorId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (instructorId != course.InstructorId)
            {
                return Forbid();
            }

            dbContext.Courses.Remove(course);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

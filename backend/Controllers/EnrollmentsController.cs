using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Enrollment;
using LumiLearn.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;
        private readonly INotificationRepository notificationRepository;

        public EnrollmentsController(LumiLearnDbContext lumiLearnDbContext, INotificationRepository notificationRepository)
        {
            dbContext = lumiLearnDbContext;
            this.notificationRepository = notificationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetEnrollmentByCourseId(Guid courseId)
        {
            var enrollments = await dbContext.Enrollments
                .Where(e => e.CourseId == courseId)
                .Select(e => new EnrollmentDto
                {
                    StudentId = e.StudentId,
                    CourseId = e.CourseId,
                })
                .ToListAsync();

            return Ok(enrollments);
        }

        // Student Enroll Course
        [HttpPost]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> EnrollCourse(EnrollRequest request)

        {
            var course = await dbContext.Courses.FirstOrDefaultAsync(c => c.Id == request.CourseId);

            if (course == null)
            {
                return BadRequest("Course doesn't exist");
            }

            var studentId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var studentUserName = User.FindFirst(ClaimTypes.Name)?.Value;
            var isEnrolledCourse = await dbContext.Enrollments
                .FirstOrDefaultAsync(e => e.CourseId == request.CourseId && e.StudentId == studentId);

            if (isEnrolledCourse != null)
            {
                return Conflict("You already enroll this course");
            }

            var newEnrollment = new Enrollment
            {
                StudentId = studentId,
                CourseId = request.CourseId,
            };

            await dbContext.Enrollments.AddAsync(newEnrollment);
            await dbContext.SaveChangesAsync();

            var enrollmentDto = new EnrollmentDto
            {
                StudentId = newEnrollment.StudentId,
                CourseId = newEnrollment.CourseId,
            };

            _ = Task.Run(async () =>
            {
                await notificationRepository
                .SendNotificationToTeacherWhenStudentEnrollCourse(
                    studentUserName,
                    course
                );
            }).ConfigureAwait(false);

            return CreatedAtAction(nameof(GetEnrollmentByCourseId), enrollmentDto);
        }

        [HttpDelete]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> LeaveCourse(EnrollRequest request)
        {
            var course = await dbContext.Courses.FirstOrDefaultAsync(c => c.Id == request.CourseId);

            if (course == null)
            {
                return BadRequest("Course doesn't exist");
            }

            var studentId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var enrolledCourse = await dbContext.Enrollments
                .FirstOrDefaultAsync(e => e.CourseId == request.CourseId && e.StudentId == studentId);

            if (enrolledCourse == null)
            {
                return Conflict("You have not enrolled this course");
            }

            dbContext.Enrollments.Remove(enrolledCourse);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

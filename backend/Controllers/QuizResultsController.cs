using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.QuizResult;
using LumiLearn.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LumiLearn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizResultsController : Controller
    {
        private readonly LumiLearnDbContext _context;
        private readonly INotificationRepository notificationRepository;

        public QuizResultsController(LumiLearnDbContext context, INotificationRepository notificationRepository)
        {
            _context = context;
            this.notificationRepository = notificationRepository;
        }

        // GET: api/quizresults?userId={userId}&quizId={quizId}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizResultDto>>> GetQuizResultsByUserId([FromQuery] Guid userId, Guid quizId)
        {
            var results = await _context.QuizResult
                .AsNoTracking()
                .Where(r => r.UserId == userId && r.QuizId == quizId)
                .Select(r => new QuizResultDto
                {
                    UserId = r.UserId,
                    QuizId = r.QuizId,
                    Score = r.score
                })
                .ToListAsync();

            return Ok(results);
        }

        // GET: api/quizresults/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<QuizResultDto>> GetQuizResultById(Guid id)
        {
            var result = await _context.QuizResult
                .AsNoTracking()
                .Where(r => r.Id == id)
                .Select(r => new QuizResultDto
                {
                    UserId = r.UserId,
                    QuizId = r.QuizId,
                    Score = r.score
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // Submit Quiz
        [HttpPost]
        public async Task<IActionResult> SubmitQuizResult([FromBody] QuizSubmissionDto submission)
        {

            double totalQuestions = submission.Answers.Count;
            double correctAnswers = 0;
            double wrongAnswers = 0;

            foreach (var answer in submission.Answers)
            {
                var correctOption = await _context.AnswerOptions
                    .FirstOrDefaultAsync(a => a.Id == answer.SelectedAnswerId && a.QuestionId == answer.QuestionId);

                if (correctOption != null && correctOption.IsCorrect)
                {
                    correctAnswers++;
                }
                else if ( correctOption != null && !correctOption.IsCorrect)
                {
                    wrongAnswers++;
                }
            }

            double rawScore = (double)correctAnswers / totalQuestions * 100.0;
            double score = Math.Round(rawScore, 2);

            var quizResult = new QuizResult
            {
                Id = Guid.NewGuid(),
                UserId = submission.UserId,
                QuizId = submission.QuizId,
                score = score
            };

            _context.QuizResult.Add(quizResult);
            await _context.SaveChangesAsync();

            var studentUserName = User.FindFirst(ClaimTypes.Name)?.Value;

            _ = Task.Run(async () =>
            {
                await notificationRepository
                .SendNotificationToTeacherWhenStudentSubmitQuiz(
                    studentUserName,
                    quizResult.QuizId,
                    quizResult.score
                );
            }).ConfigureAwait(false);

            return Ok(new
            {
                Id = quizResult.Id,
                TotalQuestions = totalQuestions,
                CorrectAnswers = correctAnswers,
                WrongAnswers = wrongAnswers,
                Score = score
            });
        }

        // PUT: api/quizresults/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateQuizResult(Guid id, [FromBody] QuizResultDto updatedDto)
        {
            var existingResult = await _context.QuizResult.FirstOrDefaultAsync(r => r.Id == id);
            if (existingResult == null)
                return NotFound();

            existingResult.score = updatedDto.Score;
            existingResult.QuizId = updatedDto.QuizId;
            existingResult.UserId = updatedDto.UserId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/quizresults/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteQuizResult(Guid id)
        {
            var result = await _context.QuizResult.FirstOrDefaultAsync(r => r.Id == id);
            if (result == null)
                return NotFound();

            _context.QuizResult.Remove(result);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

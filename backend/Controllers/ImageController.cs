using LumiLearn.Dtos.S3;
using LumiLearn.Dtos.S3.Response;
using LumiLearn.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : Controller
    {
        private readonly S3Services s3Services;

        public ImageController(S3Services s3Services, IOptions<S3BucketProperties> properties)
        {
            this.s3Services = s3Services;
        }

        [HttpGet("BucketLocation")]
        public async Task<IActionResult> GetBucketLocation(string bucketName)
        {
            var data = await s3Services.GetBucketLocation(bucketName);

            return Ok(data);
        }

        [HttpPost("UploadImage")]
        [Authorize]
        public async Task<UploadFileResponse> UploadImage(IFormFile file)
        {
            if (file.Length == 0 || file == null)
            {
                return new UploadFileResponse
                {
                    Error = "File not specified.",
                    HttpStatusCode = 400,
                    FileURL = null
                };
            }

            var fileName = file.FileName;
            var contentType = file.ContentType;
            if (contentType.Contains("image")) contentType = "image/png";
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            string key = $"profile-pic/{userId}";

            using(var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);

                var response = await s3Services.UploadFileAsync(stream, key, contentType);
                return response;
            }
        }
    }
}

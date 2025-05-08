using Amazon.S3;
using Amazon.S3.Model;
using LumiLearn.Dtos.S3;
using LumiLearn.Dtos.S3.Response;
using Microsoft.Extensions.Options;
using System.IO;

namespace LumiLearn.Services
{
    public class S3Services
    {
        private readonly IAmazonS3 _client;
        private readonly S3BucketProperties bucketProperties;

        public S3Services(IOptions<AwsCredentials> credentials, IOptions<S3BucketProperties> bucketProperties)
        {
            _client = new AmazonS3Client(credentials.Value.ACCESS_KEY_ID, credentials.Value.SECRET_ACCESS_KEY,
                new AmazonS3Config
                {
                    RegionEndpoint = Amazon.RegionEndpoint.APSoutheast2
                });
            this.bucketProperties = bucketProperties.Value;
        }

        public async Task<string> GetBucketLocation(string bucketName)
        {
             try
            {
                var response = await _client.GetBucketLocationAsync(bucketName);

                return response.Location;
            }
            catch (AmazonS3Exception ex)
            {
                return "";
            }
        }

        public async Task<UploadFileResponse> UploadFileAsync(MemoryStream inputStream, string key, string contentType)
        {
            try
            {
                var bucketName = bucketProperties.BucketName;
                var request = new PutObjectRequest
                {
                    BucketName = bucketName,
                    InputStream = inputStream,
                    ContentType = contentType,
                    Key = key
                };

                var response = await _client.PutObjectAsync(request);
                string fileURL = $"https://{bucketProperties.BucketName}.s3.{bucketProperties.Region}.amazonaws.com/{key}";
                fileURL = fileURL.Replace(' ', '+');

                return new UploadFileResponse
                {
                    Error = null,
                    HttpStatusCode = ((int)response.HttpStatusCode),
                    FileURL = fileURL
                };
            }
            catch (AmazonS3Exception ex)
            {
                return new UploadFileResponse
                {
                    Error = ex.Message,
                    HttpStatusCode = ((int)ex.StatusCode),
                    FileURL = null
                };
            }
        }
    }
}

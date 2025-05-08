namespace LumiLearn.Dtos.S3.Response
{
    public class UploadFileResponse
    {
        public string? Error { get; set; }
        public int HttpStatusCode { get; set; }
        public string? FileURL { get; set; }
    }
}

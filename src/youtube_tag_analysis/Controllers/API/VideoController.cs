using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using youtube_tag_analysis.Services;

namespace youtube_tag_analysis.Controllers.API
{
    public class VideoController : ApiController
    {
        private VideoService service_ = new VideoService();

        [HttpGet]
        [Route("api/videos/video/{id}")]
        public HttpResponseMessage GetVideo(string id) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetVideo(id));
        }

        [HttpGet]
        [Route("api/videos/tags_per_video/{year}")]
        public HttpResponseMessage TagsPerVideoyearlyHistogram(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.YearlyTagsPerVideo(year));
        }

        [HttpGet]
        [Route("api/videos/tags_per_video/{year}/{month}")]
        public HttpResponseMessage TagsPerVideoyearlyHistogram(int year, int month) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.MonthlyTagsPerVideo(year, month));
        }

        [HttpGet]
        [Route("api/videos/tagless/{year}")]
        public HttpResponseMessage MonthlyTaglessVideos(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.MonthlyTaglessVideos(year));
        }

        [HttpGet]
        [Route("api/videos/tagless/year")]
        public HttpResponseMessage YearlyTaglessVideos() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.YearlyTaglessVideos());
        }

        [HttpGet]
        [Route("api/videos/tagless")]
        public HttpResponseMessage TaglessVideoPercentage() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.TaglessVideoPercentage());
        }
	}
}
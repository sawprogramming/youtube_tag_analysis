using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using youtube_tag_analysis.Services;

namespace youtube_tag_analysis.Controllers.API
{
    public class StatisticsController : ApiController {
        private StatisticsService service_ = new StatisticsService();

        [HttpGet]
        [Route("api/statistics/tags_per_video")]
        public HttpResponseMessage TagsPerVideoStatistics() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.TagsPerVideoStatistics());
        }

        [HttpGet]
        [Route("api/statistics/graphs/tags_per_video")]
        public HttpResponseMessage TagsPerVideoAreaChart() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.TagsPerVideoAreaChart());
        }

        [HttpGet]
        [Route("api/statistics/histograms/tags_per_video/yearly/{year}")]
        public HttpResponseMessage TagsPerVideoyearlyHistogram(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.YearlyTagsPerVideo(year));
        }

        [HttpGet]
        [Route("api/statistics/histograms/tags_per_video/monthly/{year}/{month}")]
        public HttpResponseMessage TagsPerVideoyearlyHistogram(int year, int month) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.MonthlyTagsPerVideo(year, month));
        }

        [HttpGet]
        [Route("api/statistics/graphs/tagless/{year}")]
        public HttpResponseMessage MonthlyTaglessVideos(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.MonthlyTaglessVideos(year));
        }

        [HttpGet]
        [Route("api/statistics/graphs/tagless")]
        public HttpResponseMessage YearlyTaglessVideos() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.YearlyTaglessVideos());
        }
    }
}

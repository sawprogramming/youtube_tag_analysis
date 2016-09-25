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
        [Route("api/statistics/graphs/vids_below_first_quartile/{year}")]
        public HttpResponseMessage MonthlyBelowQuartilePecentages(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.MonthlyBelowFirstQuartile(year));
        }

        [HttpGet]
        [Route("api/statistics/graphs/vids_below_first_quartile")]
        public HttpResponseMessage YearlyBelowQuartilePecentages() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.YearlyBelowFirstQuartile());
        }

        [HttpGet]
        [Route("api/statistics/tag_length")]
        public HttpResponseMessage TagLengthStatistics() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetTagLengthStatistics());
        }

        [HttpGet]
        [Route("api/statistics/graphs/tag_length")]
        public HttpResponseMessage TagLengthAreaChart() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.TagLengthAreaChart());
        }
    }
}

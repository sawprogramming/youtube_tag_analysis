using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using youtube_tag_analysis.Services;

namespace youtube_tag_analysis.Controllers.API
{
    public class TagController : ApiController {
        private TagService service_ = new TagService();

        [HttpGet]
        [Route("api/tags/counts")]
        public HttpResponseMessage GetTagCounts(){
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetTagCounts());
        }

        [HttpGet]
        [Route("api/tags/top/{year}")]
        public HttpResponseMessage GetTopYearly(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetTop(year));
        }

        [HttpGet]
        [Route("api/tags/top/{year}/{month}")]
        public HttpResponseMessage GetTopMonthly(int year, int month) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetTop(year, month));
        }

        [HttpGet]
        [Route("api/tags/{year}/{month}")]
        public HttpResponseMessage GetMonthlyTags(int year, int month) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetMonthlyTags(year, month));
        }

        [HttpGet]
        [Route("api/tags/{year}")]
        public HttpResponseMessage GetYearlyTags(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetYearlyTags(year));
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using youtube_tag_analysis.Services;

namespace youtube_tag_analysis.Controllers.API
{
    public class OverlapController : ApiController {
        private OverlapService service_ = new OverlapService();

        [HttpGet]
        [Route("api/overlap/videos")]
        public HttpResponseMessage GetOverallVideoOverlap() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetOverallVideoOverlap());
        }

        [HttpGet]
        [Route("api/overlap/videos/{year}")]
        public HttpResponseMessage GetVideoOverlap(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetVideoOverlap(year));
        }

        [HttpGet]
        [Route("api/overlap/videos/{year}/{month}")]
        public HttpResponseMessage GetVideoOverlap(int year, int month) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetVideoOverlap(year, month));
        }
    }
}

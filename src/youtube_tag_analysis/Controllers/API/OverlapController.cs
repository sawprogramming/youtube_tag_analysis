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
        public HttpResponseMessage TagsPerVideoStatistics() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetOverallVideoOverlap());
        }
    }
}

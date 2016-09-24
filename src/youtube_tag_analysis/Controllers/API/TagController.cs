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
        [Route("api/tags")]
        public HttpResponseMessage GetAllTags(){
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetAllTags());
        }

        [HttpGet]
        [Route("api/tags/top10/{year}")]
        public HttpResponseMessage GetTop10Yearly(int year) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetTop10(year));
        }

        [HttpGet]
        [Route("api/tags/top10/{year}/{month}")]
        public HttpResponseMessage GetTop10Monthly(int year, int month) {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetTop10(month, year));
        }
    }
}
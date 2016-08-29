using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using youtube_tag_analysis.Services;

namespace youtube_tag_analysis.Controllers.API
{
    public class GeneralController : ApiController {
        private GeneralService service_ = new GeneralService();

        [HttpGet]
        [Route("api/general/years")]
        public HttpResponseMessage GetYears() {
            return Request.CreateResponse(HttpStatusCode.OK, service_.GetYears());
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace youtube_tag_analysis.Controllers.View
{
    public class DistributionController : Controller
    {
        [Route("views/Distribution/Index")]
        public ActionResult Index() {
            return View();
        }
	}
}
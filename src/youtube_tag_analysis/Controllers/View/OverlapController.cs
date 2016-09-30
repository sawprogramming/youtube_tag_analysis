using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace youtube_tag_analysis.Controllers.View
{
    public class OverlapController : Controller
    {
        [Route("views/Overlap/Full")]
        public ActionResult Full() {
            return View();
        }

        [Route("views/Overlap/Full/Tag")]
        public ActionResult Full_Tag() {
            return View();
        }

        [Route("views/Overlap/Full/Other")]
        public ActionResult Full_Other() {
            return View();
        }

        [Route("views/Overlap/Small")]
        public ActionResult Small() {
            return View();
        }

        [Route("views/Overlap/Small/Tag")]
        public ActionResult Small_Tag() {
            return View();
        }

        [Route("views/Overlap/Small/Other")]
        public ActionResult Small_Other() {
            return View();
        }
	}
}
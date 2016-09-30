using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace youtube_tag_analysis.Controllers.View
{
    public class VideoController : Controller
    {
        [Route("views/Video/Tags")]
        public ActionResult Tags() {
            return View();
        }

        [Route("views/Video/Tagless")]
        public ActionResult Tagless() {
            return View();
        }

        [Route("views/Video/Quartile")]
        public ActionResult Quartile() {
            return View();
        }
	}
}
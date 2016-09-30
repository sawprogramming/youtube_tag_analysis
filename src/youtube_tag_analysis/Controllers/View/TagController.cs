using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace youtube_tag_analysis.Controllers.View
{
    public class TagController : Controller
    {
        [Route("views/Tags/Index")]
        public ActionResult Index() {
            return View();
        }

        [Route("views/Tags/Top")]
        public ActionResult Top() {
            return View();
        }

        [Route("views/Tags/Length")]
        public ActionResult Length() {
            return View();
        }
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace youtube_tag_analysis.Controllers
{
    public class HomeController : Controller
    {
        [Route("views/Home/Index")]
        public ActionResult Index() {
            return View();
        }
    }
}

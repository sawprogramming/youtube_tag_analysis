using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace youtube_tag_analysis.Controllers
{
    public class EntryController : Controller
    {
        public ActionResult BasePage() {
            return View("~/Views/index.cshtml");
        }
    }
}

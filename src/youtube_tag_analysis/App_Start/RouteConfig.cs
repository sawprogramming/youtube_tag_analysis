using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace youtube_tag_analysis
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();

            // Eeerything should redirect to that entry page to let AngularJS choose the view
            routes.MapRoute(
                name: "CatchAll",
                url: "{*anything}",
                defaults: new { controller = "Entry", action = "BasePage" }
            );
        }
    }
}

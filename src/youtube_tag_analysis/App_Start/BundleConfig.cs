using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace youtube_tag_analysis
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-route.min.js",
                "~/Scripts/angular-messages.js",
                "~/Scripts/xregexp-min.js",
                "~/Scripts/unicode-base.js",
                "~/Scripts/dirPagination.js",
                "~/Scripts/ui-bootstrap-tpls-0.14.3.min.js",
                "~/Scripts/angular-toastr.tpls.min.js",
                "~/Scripts/ng-file-upload.min.js"
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.min.css",
                 "~/Content/angular-toastr.min.css",
                 "~/Content/Site.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/app/app.module.js",
                "~/Scripts/app/app.config.js",
                "~/Scripts/app/app.routes.js"
            ).IncludeSubdirectoriesOf("~/Scripts/app", "*.js"));
        }
    }

    // thanks http://timgthomas.com/2013/12/a-bumbling-bundler-fixing-includedirectory/
    public static class BundleExtensions
    {
        public static Bundle IncludeSubdirectoriesOf(
          this Bundle bundle,
          string path, string searchPattern)
        {
            // Get the current and root paths for `DirectoryInfo`.
            var absolutePath = HttpContext.Current.Server.MapPath(path);
            var rootPath = HttpContext.Current.Server.MapPath("~/");
            var directoryInfo = new DirectoryInfo(absolutePath);

            foreach (var directory in directoryInfo.GetDirectories())
            {
                // Swap out the absolute path format for a URL.
                var directoryPath = directory.FullName;
                directoryPath = directoryPath
                  .Replace(rootPath, "~/")
                  .Replace('\\', '/');
                bundle.IncludeDirectory(directoryPath, searchPattern);
                bundle.IncludeSubdirectoriesOf(directoryPath, searchPattern);
            }

            return bundle;
        }
    }

}

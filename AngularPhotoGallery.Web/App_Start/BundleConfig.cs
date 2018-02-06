using System.Web;
using System.Web.Optimization;

namespace AngularPhotoGallery.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular")
                .Include("~/Scripts/angular.js", "~/Scripts/angular-ui/ui-bootstrap-tpls.js", "~/Scripts/ng-file-upload-shim.min.js", "~/Scripts/ng-file-upload.min.js", "~/Scripts/dirPagination.js"));

            bundles.Add(new ScriptBundle("~/bundles/photoApp")
                .Include("~/App/main.js", "~/App/config.js")
                .IncludeDirectory("~/App/services", "*.js", false)
                .IncludeDirectory("~/App/controllers", "*.js", false));
        }
    }
}

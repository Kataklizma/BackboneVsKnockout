using System;
using System.Web.Optimization;

namespace WebApplication1
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/scripts/jquery-{version}.js")
.Include("~/scripts/jqm-config.js")
                .Include("~/scripts/jquery.mobile-1.3.1.min.js")
                .Include("~/scripts/knockout-{version}.debug.js")
                .Include("~/scripts/koUtilities.js")
                .Include("~/scripts/sammy-{version}.js")
                .Include("~/scripts/Q.js")
                .Include("~/scripts/breeze.debug.js")
                .Include("~/scripts/moment.js")
              );

            bundles.Add(
              new StyleBundle("~/Content/css")
            .Include("~/Content/jquery.mobile.structure-1.3.1.css")
                .Include("~/Content/toastr.css")
              );
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");

            //ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}
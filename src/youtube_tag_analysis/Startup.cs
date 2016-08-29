using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using youtube_tag_analysis.Services;

[assembly: OwinStartup(typeof(youtube_tag_analysis.Startup))]

namespace youtube_tag_analysis
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            new ImportService().Import();
        }
    }
}

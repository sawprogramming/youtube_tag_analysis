using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Models
{
    public class TagCountModel {
        public string       Tag       { get; set; }
        public int          NumVideos { get; set; }
    }
}
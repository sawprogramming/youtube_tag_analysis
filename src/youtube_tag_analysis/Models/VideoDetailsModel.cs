using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Models
{
    public class VideoDetailsModel : VideoModel
    {
        public List<string> Tags { get; set; }
    }
}
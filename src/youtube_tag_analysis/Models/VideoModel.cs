using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Models
{
    public class VideoModel
    {
        public string ID          { get; set; }
        public string Title       { get; set; }
        public string Description { get; set; }
        public int    Year        { get; set; }
        public int    Month       { get; set; }
    }
}
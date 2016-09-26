using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Models
{
    public class BasicOverlapModel {
        public BasicOverlapModel() {
            TagTitle            = null;
            TagDescription      = null;
            TagTitleDescription = null;
            TitleTag            = null;
            DescriptionTag      = null;
            TitleDescriptionTag = null;
        }

        public string ID                  { get; set; }
        public double? TagTitle            { get; set; }
        public double? TagDescription      { get; set; }
        public double? TagTitleDescription { get; set; }
        public double? TitleTag            { get; set; }
        public double? DescriptionTag      { get; set; }
        public double? TitleDescriptionTag { get; set; }
    }
}
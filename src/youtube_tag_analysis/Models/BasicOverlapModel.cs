using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Models
{
    public class BasicOverlapModel {
        public BasicOverlapModel() {
            TagTitle                      = null;
            TagDescription                = null;
            TagTranscript                 = null;
            TagTitleDescription           = null;
            TagTitleDescriptionTranscript = null;
            TitleTag                      = null;
            DescriptionTag                = null;
            TranscriptTag                 = null;
            TitleDescriptionTag           = null;
            TitleDescriptionTranscriptTag = null;
        }

        public string ID                             { get; set; }
        public double? TagTitle                      { get; set; }
        public double? TagDescription                { get; set; }
        public double? TagTranscript                 { get; set; }
        public double? TagTitleDescription           { get; set; }
        public double? TagTitleDescriptionTranscript { get; set; }
        public double? TitleTag                      { get; set; }
        public double? DescriptionTag                { get; set; }
        public double? TitleDescriptionTag           { get; set; }
        public double? TranscriptTag                 { get; set; }
        public double? TitleDescriptionTranscriptTag { get; set; }
    }
}
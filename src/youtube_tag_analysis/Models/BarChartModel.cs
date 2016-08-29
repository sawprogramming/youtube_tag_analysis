using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Models
{
    public class BarChartModel<X, Y> {
        public X Key   { get; set; }
        public Y Value { get; set; }
    }
}
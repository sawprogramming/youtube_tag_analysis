using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Models
{
    public class StatisticsModel {
        public int    Average            { get; set; }
        public int    Median             { get; set; }
        public int[]  Mode               { get; set; }
        public double Standard_Deviation { get; set; }
        public double Variance           { get; set; }
        public int[]  Quartiles          { get; set; }
    }
}
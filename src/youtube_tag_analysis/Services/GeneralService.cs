using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Services
{
    public class GeneralService {
        public int[] GetYears() {
            return ImportService.Videos.GroupBy(video => video.Value.Year)
                                       .Select(group => group.Key)
                                       .ToArray();
        }
    }
}
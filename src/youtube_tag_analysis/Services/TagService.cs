using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using youtube_tag_analysis.Models;

namespace youtube_tag_analysis.Services
{
    public class TagService {
        public List<TagCountModel> GetTagCounts() {
            return ImportService.Tags.Select(
                                          tag => new TagCountModel {
                                              Tag       = tag,
                                              NumVideos = ImportService.Graph.NumEdges(tag),
                                          }
                                      )
                                      .OrderBy(tag => tag.Tag)
                                      .ToList(); 
        }

        public List<TagCountModel> GetTop(int year, int month) {
            Dictionary<string, int> tagCounts = new Dictionary<string, int>();
            var videos = ImportService.Videos.Where(dict => dict.Value.Year == year && dict.Value.Month == month)
                                             .Select(dict => dict.Value);

            // count the tags for each video this year
            foreach (var video in videos) {
                foreach (var tag in ImportService.Graph.GetEdges(video.ID)) {
                    if   (!tagCounts.ContainsKey(tag)) tagCounts[tag] = 1;
                    else                               ++tagCounts[tag];
                }
            }

            // return the top 10
            return tagCounts.Select(
                                dict => new TagCountModel() {
                                    Tag       = dict.Key,
                                    NumVideos = dict.Value
                                }
                            )
                            .OrderByDescending(tag => tag.NumVideos)
                            .ToList();
        }

        public List<TagCountModel> GetTop(int year) {
            Dictionary<string, int> tagCounts = new Dictionary<string, int>();
            var videos                        = ImportService.Videos.Where(dict => dict.Value.Year == year)
                                                                    .Select(dict => dict.Value);

            // count the tags for each video this year
            foreach (var video in videos) {
                foreach (var tag in ImportService.Graph.GetEdges(video.ID)) {
                    if   (!tagCounts.ContainsKey(tag)) tagCounts[tag] = 1;
                    else                               ++tagCounts[tag];
                }
            }

            // return the top 10
            return tagCounts.Select(
                                dict => new TagCountModel() {
                                    Tag       = dict.Key,
                                    NumVideos = dict.Value
                                }
                            )
                            .OrderByDescending(tag => tag.NumVideos)
                            .ToList();
        }

        public List<string> GetMonthlyTags(int year, int month) {
            HashSet<string> usedTags = new HashSet<string>();

            // get videos from that month/year
            var videos = ImportService.Videos.Where(dict => dict.Value.Year == year && dict.Value.Month == month)
                                             .Select(dict => dict.Value);

            // get tags from those videos
            foreach(var video in videos) {
                foreach(var tag in ImportService.Graph.GetEdges(video.ID)) {
                    usedTags.Add(tag);
                }
            }

            return usedTags.ToList();
        }

        public List<string> GetYearlyTags(int year) {
            HashSet<string> usedTags = new HashSet<string>();

            // get videos from that month/year
            var videos = ImportService.Videos.Where(dict => dict.Value.Year == year)
                                             .Select(dict => dict.Value);

            // get tags from those videos
            foreach(var video in videos) {
                foreach(var tag in ImportService.Graph.GetEdges(video.ID)) {
                    usedTags.Add(tag);
                }
            }

            return usedTags.ToList();
        }
    }
}
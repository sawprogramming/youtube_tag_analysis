using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using youtube_tag_analysis.Models;

namespace youtube_tag_analysis.Services
{
    public class TagService {
        public List<TagModel> GetAllTags() {
            return ImportService.Tags.Select(
                                          tag => new TagModel {
                                              Tag       = tag,
                                              NumVideos = ImportService.Graph.NumEdges(tag),
                                          }
                                      )
                                      .OrderBy(tag => tag.Tag)
                                      .ToList(); 
        }

        public List<TagModel> GetTop10(int month, int year) {
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
                                dict => new TagModel() {
                                    Tag = dict.Key,
                                    NumVideos = dict.Value
                                }
                            )
                            .OrderByDescending(tag => tag.NumVideos)
                          //  .Take(10)
                            .ToList();
        }

        public List<TagModel> GetTop10(int year) {
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
                                dict => new TagModel() {
                                    Tag = dict.Key,
                                    NumVideos = dict.Value
                                }
                            )
                            .OrderByDescending(tag => tag.NumVideos)
                           // .Take(10)
                            .ToList();
        }
    }
}
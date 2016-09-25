using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using youtube_tag_analysis.Models;

namespace youtube_tag_analysis.Services
{
    public class VideoService {
        public List<TagsPerVideoModel> YearlyTagsPerVideo(int year) {
            List<TagsPerVideoModel> data = new List<TagsPerVideoModel>();

            // collect data
            var raw = ImportService.Videos.Where(video => video.Value.Year == year)
                                           .Select(
                                               video => new {
                                                  ID      = video.Value.ID,
                                                  NumTags = ImportService.Graph.NumEdges(video.Value.ID)
                                               }
                                            )
                                           .ToList();

            // turn data into a list of our model
            foreach (var pair in raw) {
                data.Add(new TagsPerVideoModel { 
                    ID      = pair.ID, 
                    NumTags = pair.NumTags 
                });
            }

            return data;
        }

        public List<TagsPerVideoModel> MonthlyTagsPerVideo(int year, int month) {
            List<TagsPerVideoModel> data = new List<TagsPerVideoModel>();

            // collect data
            var raw = ImportService.Videos.Where(video => video.Value.Year == year && video.Value.Month == month)
                                          .Select(
                                              video => new {
                                                 ID      = video.Value.ID,
                                                 NumTags = ImportService.Graph.NumEdges(video.Value.ID)
                                              }
                                           )
                                          .ToList();

            // turn data into a list of our model
            foreach (var pair in raw) {
                data.Add(new TagsPerVideoModel { 
                    ID      = pair.ID, 
                    NumTags = pair.NumTags 
                });
            }

            return data;
        }

        public List<BarChartModel<int, double>> MonthlyTaglessVideos(int year) {
            List<BarChartModel<int, double>> data = new List<BarChartModel<int, double>>();

            // group videos by month
            var raw = ImportService.Videos.Where(video => video.Value.Year == year)
                                          .GroupBy(video => video.Value.Month);

            // count total videos
            var total_videos_per_month = raw.Select(
                                            group => new {
                                                Month     = group.Key,
                                                NumVideos = group.Count()
                                            }
                                        )
                                        .ToList();

            // count tagless videos
            var tagless_videos_per_month = raw.Select(
                                              group => group.Count(
                                                  video => ImportService.Graph.NumEdges(video.Value.ID) == 0
                                              )
                                          )
                                          .ToList();

            // build the dataset
            for (int i = 0; i < total_videos_per_month.Count; ++i) {
                data.Add(new BarChartModel<int, double> {
                    Key   = total_videos_per_month[i].Month,
                    Value = (Convert.ToDouble(tagless_videos_per_month[i]) / total_videos_per_month[i].NumVideos) * 100
                });
            }

            return data.OrderBy(group => group.Key).ToList();
        }

        public List<BarChartModel<int, double>> YearlyTaglessVideos() {
            List<BarChartModel<int, double>> data = new List<BarChartModel<int, double>>();

            // group videos by year
            var raw = ImportService.Videos.GroupBy(video => video.Value.Year);

            // count total videos
            var total_videos_per_year = raw.Select(
                                            group => new {
                                                Year      = group.Key,
                                                NumVideos = group.Count()
                                            }
                                        )
                                        .ToList();

            // count tagless videos
            var tagless_videos_per_year = raw.Select(
                                                group => group.Count(
                                                    video => ImportService.Graph.NumEdges(video.Value.ID) == 0
                                                )
                                          )
                                          .ToList();

            // build the dataset
            for (int i = 0; i < total_videos_per_year.Count; ++i) {
                data.Add(new BarChartModel<int,double> {
                    Key   = total_videos_per_year[i].Year,
                    Value = (Convert.ToDouble(tagless_videos_per_year[i]) / total_videos_per_year[i].NumVideos) * 100
                });
            }

            return data.OrderBy(group => group.Key).ToList();
        }

        public double TaglessVideoPercentage() {
            int num_videos         = ImportService.Videos.Count;
            int num_tagless_videos = ImportService.Videos.Count(video => ImportService.Graph.NumEdges(video.Value.ID) == 0);
            return (Convert.ToDouble(num_tagless_videos) / num_videos) * 100;
        }
    }
}
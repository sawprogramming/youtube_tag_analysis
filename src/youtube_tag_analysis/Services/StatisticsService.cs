using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using youtube_tag_analysis.Models;

namespace youtube_tag_analysis.Services
{
    public class StatisticsService {
        public StatisticsModel TagsPerVideoStatistics() {
            List<int> tagsPerVideo = new List<int>();

            // populate the tags per video from the data (then sort the data)
            foreach (VideoModel video in ImportService.Videos) {
                tagsPerVideo.Add(ImportService.Graph.NumEdges(video.ID));
            }
            tagsPerVideo.Sort();
            
            // return all of the calculations
            return new StatisticsModel {
                Average            = Convert.ToInt32(tagsPerVideo.Average()),
                Median             = CalculateMedian(ref tagsPerVideo),
                Mode               = CalculateMode(ref tagsPerVideo),
                Standard_Deviation = CalculateStandardDeviation(ref tagsPerVideo),
                Variance           = CalculateVariance(ref tagsPerVideo),
                Quartiles          = CalculateQuartiles(ref tagsPerVideo)
            };
        }

        public double[] TagsPerVideoAreaChart() {
            List<int>    tagsPerVideo  = new List<int>();
            List<double> frequencyTags = new List<double>();

            // populate the tags per video from the data (then sort the data)
            foreach (VideoModel video in ImportService.Videos) {
                tagsPerVideo.Add(ImportService.Graph.NumEdges(video.ID));
            }
            tagsPerVideo.Sort();

            // group these tags up by their count
            tagsPerVideo = tagsPerVideo.GroupBy(value => value)
                                       .Select(g => g.Count())
                                       .ToList();

            // change this to be frequency
            for (int num_tags = 0; num_tags < tagsPerVideo.Count; ++num_tags) {
                frequencyTags.Add(Convert.ToDouble(tagsPerVideo[num_tags]) / ImportService.Videos.Count);
            }

            return frequencyTags.ToArray();
        }

        public List<TagsPerVideoModel> YearlyTagsPerVideo(int year) {
            List<TagsPerVideoModel> data = new List<TagsPerVideoModel>();

            // collect data
            var raw = ImportService.Videos.Where(video => video.Year == year)
                                           .Select(
                                               video => new {
                                                  ID      = video.ID,
                                                  NumTags = ImportService.Graph.NumEdges(video.ID)
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
            var raw = ImportService.Videos.Where(video => video.Year == year && video.Month == month)
                                          .Select(
                                              video => new {
                                                 ID      = video.ID,
                                                 NumTags = ImportService.Graph.NumEdges(video.ID)
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
            var raw = ImportService.Videos.Where(video => video.Year == year)
                                          .GroupBy(video => video.Month);

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
                                                  video => ImportService.Graph.NumEdges(video.ID) == 0
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
            var raw = ImportService.Videos.GroupBy(video => video.Year);

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
                                                    video => ImportService.Graph.NumEdges(video.ID) == 0
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
            int num_tagless_videos = ImportService.Videos.Count(video => ImportService.Graph.NumEdges(video.ID) == 0);
            return (Convert.ToDouble(num_tagless_videos) / num_videos) * 100;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        private int CalculateMedian(ref List<int> list) {
            int middle = list.Count / 2;
            if (middle % 2 == 0) return (list[middle] + list[middle - 1]) / 2;
            else                 return list[middle];
        }

        private int[] CalculateMode(ref List<int> list) {
            // group the list by frequency of the values
            var groups = list.GroupBy(value => value)
                                   .Select(g => new { Value = g.Key, Count = g.Count() })
                                   .ToList();

            // record the max frequency 
            int maxCount = groups.Max(g => g.Count);

            // return all values with that frequency
            return groups.Where(g => g.Count == maxCount)
                         .Select(g => g.Value)
                         .ToArray();
        }

        private double CalculateStandardDeviation(ref List<int> list) {
            int    average = Convert.ToInt32(list.Average());
            double sst     = list.Select(val => (val - average) * (val - average)).Sum();
            return           Math.Sqrt(sst / list.Count);
        }

        private double CalculateVariance(ref List<int> list) {
            double standard_deviation = CalculateStandardDeviation(ref list);
            return standard_deviation * standard_deviation;
        }

        private int[] CalculateQuartiles(ref List<int> list) {
            int       lower, middle, upper;
            List<int> lower_range, upper_range;

            // using the TI-83 method
            if (list.Count % 2 == 0) {
                lower_range = list.GetRange(0, list.Count / 2);
                upper_range = list.GetRange(list.Count / 2, list.Count / 2);
            } else {
                lower_range = list.GetRange(0, list.Count / 2 - 1);
                upper_range = list.GetRange(list.Count / 2 + 1, list.Count / 2 - 1);
            }

            // calculate quartiles
            lower  = CalculateMedian(ref lower_range);
            middle = CalculateMedian(ref list);
            upper  = CalculateMedian(ref upper_range);

            return new int [] { lower, middle, upper };
        }
    }
}
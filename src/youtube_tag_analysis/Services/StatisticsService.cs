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
            foreach (var video in ImportService.Videos) {
                tagsPerVideo.Add(ImportService.Graph.NumEdges(video.Value.ID));
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
            foreach (var video in ImportService.Videos) {
                tagsPerVideo.Add(ImportService.Graph.NumEdges(video.Value.ID));
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

        public List<BarChartModel<int, double>> MonthlyBelowFirstQuartile(int year) {
            StatisticsModel                  stats = TagsPerVideoStatistics();
            List<BarChartModel<int, double>> data  = new List<BarChartModel<int, double>>();

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

            // count videos with number of tags below the first quartile videos
            var lower_videos_per_month = raw.Select(
                                              group => group.Count(
                                                  video => ImportService.Graph.NumEdges(video.Value.ID) < stats.Quartiles[0]
                                              )
                                          )
                                          .ToList();

            // build the dataset
            for (int i = 0; i < total_videos_per_month.Count; ++i) {
                data.Add(new BarChartModel<int, double> {
                    Key   = total_videos_per_month[i].Month,
                    Value = (Convert.ToDouble(lower_videos_per_month[i]) / total_videos_per_month[i].NumVideos) * 100
                });
            }

            return data.OrderBy(group => group.Key).ToList();
        }

        public List<BarChartModel<int, double>> YearlyBelowFirstQuartile() {
            StatisticsModel                  stats = TagsPerVideoStatistics();
            List<BarChartModel<int, double>> data  = new List<BarChartModel<int, double>>();

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

            // count videos with number of tags below the first quartile
            var lower_videos_per_year = raw.Select(
                                             group => group.Count(
                                                 video => ImportService.Graph.NumEdges(video.Value.ID) < stats.Quartiles[0]
                                             )
                                         )
                                         .ToList();

            // build the dataset
            for (int i = 0; i < total_videos_per_year.Count; ++i) {
                data.Add(new BarChartModel<int, double> {
                    Key   = total_videos_per_year[i].Year,
                    Value = (Convert.ToDouble(lower_videos_per_year[i]) / total_videos_per_year[i].NumVideos) * 100
                });
            }

            return data.OrderBy(group => group.Key).ToList();
        }

        public StatisticsModel GetTagLengthStatistics() {
            List<int> tagLengths = ImportService.Tags.Select(tag => tag.Length)
                                                     .OrderBy(length => length)
                                                     .ToList();
            
            // return all of the calculations
            return new StatisticsModel {
                Average            = Convert.ToInt32(tagLengths.Average()),
                Median             = CalculateMedian(ref tagLengths),
                Mode               = CalculateMode(ref tagLengths),
                Standard_Deviation = CalculateStandardDeviation(ref tagLengths),
                Variance           = CalculateVariance(ref tagLengths),
                Quartiles          = CalculateQuartiles(ref tagLengths)
            };
        }

        public double[] TagLengthAreaChart() {
            List<double> frequencyTags = new List<double>();

            // count number of tags of each length
            List<int> tagLengths = ImportService.Tags.Select(tag => tag.Length)
                                                     .GroupBy(length => length)
                                                     .Select(group => group.Count())
                                                     .ToList();

            // change this to be frequency
            for (int length = 0; length < tagLengths.Count; ++length) {
                frequencyTags.Add(Convert.ToDouble(tagLengths[length]) / ImportService.Tags.Count);
            }

            return frequencyTags.ToArray();
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
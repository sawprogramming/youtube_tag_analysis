using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using youtube_tag_analysis.Classes;
using youtube_tag_analysis.Models;

namespace youtube_tag_analysis.Services
{
    public class OverlapService {
        public List<BasicOverlapModel> GetOverallVideoOverlap() {
            return GetVideoOverlap(ImportService.Videos.Values);
        }

        public List<BasicOverlapModel> GetSmallVideoOverlap() {
            return GetVideoOverlap(ImportService.Videos.Values.Where(
                video =>
                    !String.IsNullOrEmpty(video.Transcript)
                )
                .ToList()
            );
        }

        public List<BasicOverlapModel> GetVideoOverlap(int year) {
            return GetVideoOverlap(ImportService.Videos.Values.Where(
                    video =>
                        video.Year == year
                )
                .ToList()
            );
        }

        public List<BasicOverlapModel> GetVideoOverlap(int year, int month) {
            return GetVideoOverlap(ImportService.Videos.Values.Where(
                    video =>
                        video.Year  == year
                     && video.Month == month
                )
                .ToList()
            );
        }

         public List<BasicOverlapModel> GetSmallVideoOverlap(int year) {
            return GetVideoOverlap(ImportService.Videos.Values.Where(
                    video =>
                        !String.IsNullOrEmpty(video.Transcript)
                     && video.Year == year
                )
                .ToList()
            );
        }

        public List<BasicOverlapModel> GetSmallVideoOverlap(int year, int month) {
            return GetVideoOverlap(ImportService.Videos.Values.Where(
                    video =>
                        !String.IsNullOrEmpty(video.Transcript)
                     && video.Year == year
                     && video.Month == month
                )
                .ToList()
            );
        }
        public List<BasicOverlapModel> GetVideoOverlap(ICollection<VideoModel> videos) {
            List<BasicOverlapModel> list = new List<BasicOverlapModel>();

            foreach(var video in videos) {
                HashSet<string> title = new HashSet<string>();
                HashSet<string> descr = new HashSet<string>();
                HashSet<string> trans = new HashSet<string>();
                HashSet<string> tags  = new HashSet<string>();

                // split text by spaces
                string[] title_words = new string[0], descr_words = new string[0], trans_words = new string[0];
                if(!String.IsNullOrEmpty(video.Title))       title_words = video.Title.Split(' ');
                if(!String.IsNullOrEmpty(video.Description)) descr_words = video.Description.Split(' ');
                if(!String.IsNullOrEmpty(video.Transcript))  trans_words = video.Transcript.Split(' ');

                // fill in structures
                foreach(var word in title_words) {
                    title.Add(word.RemovePunctuation().ToLower());
                }
                foreach(var word in descr_words) {
                    descr.Add(word.RemovePunctuation().ToLower());
                }
                foreach(var word in trans_words) {
                    trans.Add(word.RemovePunctuation().ToLower());
                }
                foreach(var tag in ImportService.Graph.GetEdges(video.ID)) {
                    tags.Add(tag.ToLower());
                }

                // calculate overlap (with null value checks)
                BasicOverlapModel model = new BasicOverlapModel() { ID = video.ID };
                if(tags.Count > 0) {
                    if (title.Count > 0) {
                        model.TagTitle = ((double)tags.Intersect(title).Count() / tags.Count)  * 100;
                        model.TitleTag = ((double)title.Intersect(tags).Count() / title.Count) * 100;
                    }

                    if (descr.Count > 0) {
                        model.TagDescription = ((double)tags.Intersect(descr).Count() / tags.Count)  * 100;
                        model.DescriptionTag = ((double)descr.Intersect(tags).Count() / descr.Count) * 100;
                    }

                    if (trans.Count > 0) {
                        model.TagTranscript = ((double)tags.Intersect(trans).Count() / tags.Count)  * 100;
                        model.TranscriptTag = ((double)trans.Intersect(tags).Count() / trans.Count) * 100;
                    }
   
                    if (title.Count > 0 || descr.Count > 0) {
                        model.TagTitleDescription = ((double)tags.Intersect(title.Union(descr)).Count() / tags.Count)                 * 100;
                        model.TitleDescriptionTag = ((double)title.Union(descr).Intersect(tags).Count() / title.Union(descr).Count()) * 100;
                    }

                    if (title.Count > 0 || descr.Count > 0 || trans.Count > 0) {
                        model.TagTitleDescriptionTranscript = ((double)tags.Intersect(title.Union(descr).Union(trans)).Count() / tags.Count) * 100;
                        model.TitleDescriptionTranscriptTag = ((double)title.Union(descr).Union(trans).Intersect(tags).Count() / title.Union(descr).Union(trans).Count()) * 100;
                    }
                }
                list.Add(model);
            }

            return list;
        }
    }
}
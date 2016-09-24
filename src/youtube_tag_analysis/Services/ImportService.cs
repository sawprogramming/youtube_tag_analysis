using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using youtube_tag_analysis.Classes;
using youtube_tag_analysis.Models;

namespace youtube_tag_analysis.Services
{
    public class ImportService
    {
        public static graph<string>    Graph                { get; private set; }
        public static HashSet<string>  Tags                 { get; private set; }
        public static Dictionary<string, VideoModel> Videos { get; private set; }

        /// <summary>
        /// Initializes the data structures that store the imported data.
        /// </summary>
        /// <remarks>
        /// The data is static and was already populated when the application launched; there is no need to reconstruct the object.
        /// </remarks>
        public ImportService() {
            Graph  = new graph<string>();
            Tags   = new HashSet<string>();
            Videos = new Dictionary<string, VideoModel>();
        }

        /// <summary>
        /// This clears the data structures and imports the data from the csv files.
        /// </summary>
        /// <remarks>
        /// The data is static and was already populated when the application launched; there is no need to call this function again.
        /// </remarks>
        public void Import() {
            Graph.Clear();
            Tags.Clear();
            Videos.Clear();
            
            ImportVideos(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"App_Data\Large Dataset\largedataset.csv"));
            ImportTags(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"App_Data\tagsPerVideo.csv"));
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        private void ImportTags(string path) {
            using (TextFieldParser parser = new TextFieldParser(path)) {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(";");

                // extract tags from the data
                while (!parser.EndOfData) {
                    string[] fields = parser.ReadFields();

                    // add each tag to our list of tags (the first element is the video ID) and graph the relations
                    for (int field = 1; field < fields.Count(); ++field) {
                        Tags.Add(fields[field]);
                        Graph.Insert(fields[field]);
                        Graph.AddEdge(fields[0], fields[field]);
                    }
                }
            }
        }

        private void ImportVideos(string path) {
            using (TextFieldParser parser = new TextFieldParser(path)) {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                parser.ReadFields(); // ignore headers

                // extract all videos from the data
                while (!parser.EndOfData) {
                    string[] fields = parser.ReadFields();

                    // add the video to the list of videos
                    Videos.Add(fields[0], new VideoModel {
                         ID          = fields[0],
                         Title       = fields[1],
                         Description = fields[2],
                         Year        = int.Parse(fields[3]),
                         Month       = int.Parse(fields[4])
                    });

                    // add the video to the graph
                    Graph.Insert(fields[0]);
                }
            }
        }
    }
}
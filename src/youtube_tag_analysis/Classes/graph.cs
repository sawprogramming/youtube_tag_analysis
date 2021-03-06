﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace youtube_tag_analysis.Classes
{
    public class graph<T> {
        public bool HasVertex(T value) {
            return vertices_.ContainsKey(value);
        }

        public int NumEdges(T value) {
            if (HasVertex(value)) {
                return adjacency_list_[vertices_[value]].Count;
            }
            return -1;
        }

        public List<T> GetEdges(T value) {
            List<T> edges = new List<T>();

            if (HasVertex(value)) {
                edges.AddRange(adjacency_list_[vertices_[value]]);
            }

            return edges;
        }

        public void AddEdge(T from, T to) {
            adjacency_list_[vertices_[from]].Add(to);
            adjacency_list_[vertices_[to]].Add(from);
        }

        public bool HasEdge(T from, T to) {
            if   (adjacency_list_[vertices_[from]].Contains(to)) return  true;
            else                                                 return false;
        }

        public void Insert(T value) {
            if (!HasVertex(value)) {
                vertices_.Add(value, adjacency_list_.Count);
                adjacency_list_.Add(new List<T>());
            }
        }

        public void Clear() {
            vertices_.Clear();
            adjacency_list_.Clear();
        }

        private Dictionary<T, int> vertices_       = new Dictionary<T, int>();
        private List<List<T>>      adjacency_list_ = new List<List<T>>();
    }
}
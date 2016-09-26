using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace youtube_tag_analysis.Classes
{
    public static class StringExtensions
    {
        public static string RemovePunctuation(this string text) {
            StringBuilder sb = new StringBuilder();

            foreach (char ch in text) {
                // keep numbers, letters, ' for words like "isn't", - for words like twenty-two
                if (char.IsLetterOrDigit(ch) || ch == '\'' || ch == '-') {
                    sb.Append(ch);
                }
            }

            return sb.ToString();
        }
    }
}
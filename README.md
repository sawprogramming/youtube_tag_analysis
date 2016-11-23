# Quantitative Analysis of YouTube Tags
YouTube is one of the most popular websites for sharing videos, containing 60% of videos watched online. They use the tags assigned to a video as a means to improve content discovery and browsing of related content in a large collection of videos. We want to collect information regarding the textual properties of tags and their relationship with other metadata elements such as the title, description, and transcript.
![Screenshot of Application](http://i.imgur.com/Rkzlirx.png)

# Data Sets
We have a data set containing the metadata of 52,923 YouTube videos on the subject of "Java Programming". For 546 of these videos, we also have the English transcript available.

# Technical Details
- This is structured like a single page app. All of the data is provided via the WebAPI, and AngularJS and Bootstrap are used to create the client interface.
- I intended for this project to run on local machines only. Thus, the interface excludes loading notfications and server error response like a published web application would.
- This is feature complete. The only planned changes are about tweaking how tags are defined.

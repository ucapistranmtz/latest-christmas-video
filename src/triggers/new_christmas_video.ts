import { type } from "os";

// triggers on a new newcristmasvideo with a certain tag
const perform = async (z, bundle) => {
  const accessToken = bundle.authData.access_token; //  OAuth2

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const publishedAfter = today.toISOString();

  const response = await z.request({
    url: "https://www.googleapis.com/youtube/v3/search",
    params: {
      part: "snippet",
      type: "video",
      q: "navidad",
      order: "date",
      publishedAfter,
      maxResults: 1, //get  the latest video, setting in 1 will reduce the api quota usage
    },
    headers: {
      Authorization: `Bearer ${accessToken}`, // <-- token from  OAuth2
    },
  });

  if (!response.data.items || response.data.items.length === 0) {
    return [];
  }

  const items = response.data.items.map((video) => ({
    id: video.id.videoId,
    title: video.snippet.title,
    description: video.snippet.description || "No description available",
    publishedAt: new Date(video.snippet.publishedAt).toISOString(),
    thumbnail: video.snippet.thumbnails.high.url,
    videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
  }));

  return items;
};

const newChristmasVideos = {
  key: "new_christmas_video",
  noun: "Christmas Video",

  display: {
    label: "New Christmas Video",
    description:
      "Triggers when a new Christmas-related YouTube video is published.",
  },

  operation: {
    perform,
    cleanInputData: false, // to keep the data  the same as google retunrs it
    sample: {
      id: "abcd1234",
      title: "Samble christmas youtube video",
      description: "Happy holidays! Enjoy this festive video.",
      publishedAt: "2025-12-03T10:00:00Z", // ISO 8601
      thumbnail: "https://example.com/thumbnail.jpg",
      videoUrl: "https://www.youtube.com/watch?v=example",
    },

    outputFields: [
      { key: "id", label: "Video ID" },
      { key: "title", label: "Video title" },
      { key: "description", label: "Video description" },
      { key: "publishedAt", label: "Published At", type: "datetime" },
      { key: "thumbnail", label: "Video thumbnail" },
      { key: "videoUrl", label: "Video URL" },
    ],
  },
};
export default newChristmasVideos;

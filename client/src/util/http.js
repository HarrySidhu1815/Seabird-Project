// fetch("/api/videos/")
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }

import { QueryClient } from "@tanstack/react-query";

//     return response.json().then((data) => {
//       console.log(data.message);
//     });
//   })
//   .then((data) => {
//     setVideos(data.videos);
//     setSelectedVideos(data.videos);
//   })
//   .catch((error) => console.log(error));

export const queryClient = new QueryClient()

export async function fetchVideos() {
  const response = await fetch("/api/videos");

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { videos } = await response.json();

  return videos;
}

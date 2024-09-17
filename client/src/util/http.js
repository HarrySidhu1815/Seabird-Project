export async function fetchVideosData(){
  const response = await fetch("/api/videos", {
    method: "POST",
    body: JSON.stringify({
      user: currentUser,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data.videos
}
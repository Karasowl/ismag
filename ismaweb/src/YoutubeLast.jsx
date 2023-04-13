import { useEffect, useState } from "react";

const API_KEY = "AIzaSyAj-jg8pkbnuNfrIeOD018R3xVTfH5jWKI";
const CHANNEL_ID = "UCX-0vZliN8aUFGyr_WGxndA";
const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;

const YoutubeLast = () => {
  const [videoId, setVideoId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        let cachedData = localStorage.getItem("lastVideoData");
        if (cachedData) {
          cachedData = JSON.parse(cachedData);
          const cachedTimestamp = cachedData.timestamp;
          const currentTimestamp = Date.now() / 1000;
          const timestampDiff = currentTimestamp - cachedTimestamp;
          if (timestampDiff < 86400) {
            // Si el valor en caché es menos de un día de edad, lo usamos
            setVideoId(cachedData.videoId);
            setApiResponse(cachedData.apiResponse);
            return;
          }
        }

        // Si el valor en caché es más de un día de edad (o no hay valor en caché), hacemos una nueva solicitud a la API de YouTube
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        const newVideoId = data.items[0].id.videoId;
        const newTimestamp = Date.now() / 1000;
        setVideoId(newVideoId);
        setApiResponse(data);
        localStorage.setItem(
          "lastVideoData",
          JSON.stringify({
            videoId: newVideoId,
            apiResponse: data,
            timestamp: newTimestamp,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, []);

  return (
    <div>
      <iframe
        width="490"
        height="190"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        autoFocus
      ></iframe>
      {apiResponse && (
        <div>
          <h2>{apiResponse.items[0].snippet.title}</h2>
          <p>{apiResponse.items[0].snippet.description}</p>
        </div>
      )}
    </div>
  );
};

export default YoutubeLast;
import { createVideoCard } from '../videoCard/videoCard.js';

export function setupVideoList(videos) {
  fetch('/js/components/videoList/videoList.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('.video-list-container').innerHTML = data;
      const videoListElement = document.getElementById('videoList');
      videos.forEach(video => {
        const videoElement = createVideoCard(video);
        videoListElement.appendChild(videoElement);
      });
    })
    .catch(error => console.error('Error loading video list:', error));
}

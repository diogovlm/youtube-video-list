import { createVideoCard } from '../videoCard/videoCard.js';

export function setupVideoList(videos, clear = true) {
  fetch('/js/components/videoList/videoList.html')
    .then(response => response.text())
    .then(data => {
      if (clear) {
        document.querySelector('.video-list-container').innerHTML = data;
      }

      const videoListContainer = document.querySelector('.video-list');

      videos.forEach(video => {
          const videoCard = createVideoCard(video);
          videoListContainer.appendChild(videoCard);
      });
    })
    .catch(error => console.error('Error loading video list:', error));
}

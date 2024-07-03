import { createVideoCard } from '../videoCard/videoCard.js';
import { auth, loadFavorites } from '../../firebase.js'

export async function setupVideoList(videos, clear = true) {

  const user = auth.currentUser;
  let favorites = [];
  
  if (user) {
    favorites = await loadFavorites(user.uid);
  }

  fetch('/js/components/videoList/videoList.html')
    .then(response => response.text())
    .then(data => {
      if (clear) {
        document.querySelector('.video-list-container').innerHTML = data;
      }

      const videoListContainer = document.querySelector('.video-list');

      videos.forEach(video => {
          const videoCard = createVideoCard(video, favorites);
          videoListContainer.appendChild(videoCard);
      });
    })
    .catch(error => console.error('Error loading video list:', error));
}

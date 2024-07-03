import { auth } from '/js/firebase.js'

export function createVideoCard(video, favorites = []) {
  const cardTemplate = document.createElement('template');
  cardTemplate.innerHTML = `
    <div class="video-card">
      <img class="video-thumbnail" src="${video.snippet.thumbnails.default.url}" alt="Video Thumbnail">
      <div class="star-toggle">
        <span class="star">&#9733;</span> <!-- Unicode star character -->
      </div>
    </div>
  `;

  const cardElement = cardTemplate.content.firstElementChild;
  const starToggle = cardElement.querySelector('.star-toggle .star');

  const isFavorited = favorites.some(fav => fav.video.id.videoId === video.id.videoId);
  if (isFavorited) {
    starToggle.classList.add('favorited');
  }

  starToggle.addEventListener('click', async () => {
    starToggle.classList.toggle('favorited');
    if (starToggle.classList.contains('favorited')) {
      await addToFavorites(video);
    } else {
      await removeFromFavorites(video);
    }
  });

  return cardElement;
}

async function addToFavorites(video) {
  const user = auth.currentUser;
  if (!user) {
    alert('Please log in to add favorites.');
    return;
  }

  const response = await fetch('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user.uid,
      video,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    alert(data.message);
    // Update favorite count
    updateFavoriteCount(data.newCount);
  } else {
    console.error(data.error);
    alert(data.message || 'Failed to add favorite');
  }
}

async function removeFromFavorites(video) {
  const user = auth.currentUser;
  if (!user) {
    alert('Please log in to remove favorites.');
    return;
  }

  const response = await fetch('/api/favorites', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user.uid,
      video,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    alert(data.message);
    // Update favorite count
    updateFavoriteCount(data.newCount);
  } else {
    console.error(data.error);
    alert(data.message || 'Failed to remove favorite');
  }
}

function updateFavoriteCount(count) {
  const favoriteCountElement = document.getElementById('favoriteCount');
  if (favoriteCountElement) {
    favoriteCountElement.textContent = count;
  } else {
    console.error('Favorite count element not found');
  }
}

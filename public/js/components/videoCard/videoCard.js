import { auth } from '../../firebase.js'

export function createVideoCard(video) {
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

  // Commented out parameter that will determine initial state
  // if (video.isFavorited) {
  //     starToggle.classList.add('favorited');
  // }

  starToggle.addEventListener('click', () => {
    starToggle.classList.toggle('favorited');
    addToFavorites(video)
  });

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
  } else {
    alert(data.message || 'Failed to add favorite');
  }
}

  return cardElement;
}

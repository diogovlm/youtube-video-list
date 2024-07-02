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
    // Placeholder for future method
    // handleStarToggle(video.id, starToggle.classList.contains('favorited'));
  });

  return cardElement;
}

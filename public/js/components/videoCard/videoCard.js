export function createVideoCard(item) {
  const videoElement = document.createElement('div');
  videoElement.className = 'video-card';

  videoElement.innerHTML = `
      <h3 class="video-title">${item.snippet.title}</h3>
      <img class="video-thumbnail" src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
      <p class="video-description">${item.snippet.description}</p>
  `;

  return videoElement;
}
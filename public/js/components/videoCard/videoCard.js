export function createVideoCard(video) {
  const videoElement = document.createElement('div');
  videoElement.classList.add('video-card');

  videoElement.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" class="video-thumbnail" data-video-id="${video.id.videoId}">
  `;

  videoElement.querySelector('.video-thumbnail').addEventListener('click', () => {
      window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank');
  });

  return videoElement;
}

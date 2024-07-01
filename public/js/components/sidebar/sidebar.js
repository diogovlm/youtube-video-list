export function setupSidebar() {
  fetch('/js/components/sidebar/sidebar.html')
      .then(response => response.text())
      .then(data => {
          document.body.insertAdjacentHTML('afterbegin', data);
          document.getElementById('videosButton').addEventListener('click', () => {
              window.location.href = '/pages/videos/videos.html';
          });
          document.getElementById('favoritesButton').addEventListener('click', () => {
              window.location.href = '/pages/favorites/favorites.html';
          });
      })
      .catch(error => console.error('Error loading sidebar:', error));
}

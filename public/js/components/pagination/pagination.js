export function setupPagination(nextPageToken, prevPageToken, onPageChange) {
  fetch('/js/components/pagination/pagination.html')
      .then(response => response.text())
      .then(data => {
          document.querySelector('.pagination-container').innerHTML = data;

          const nextButton = document.getElementById('nextPage');
          const prevButton = document.getElementById('prevPage');

          if (nextPageToken) {
              nextButton.style.display = 'inline';
              nextButton.onclick = () => onPageChange(nextPageToken);
          } else {
              nextButton.style.display = 'none';
          }

          if (prevPageToken) {
              prevButton.style.display = 'inline';
              prevButton.onclick = () => onPageChange(prevPageToken);
          } else {
              prevButton.style.display = 'none';
          }
      })
      .catch(error => console.error('Error loading pagination:', error));
}

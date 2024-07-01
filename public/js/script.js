import { setupSidebar } from './components/sidebar/sidebar.js';
import { setupVideoList } from './components/videoList/videoList.js';

setupSidebar();

async function searchVideos() {
  const query = document.getElementById('query').value;
  const response = await fetch(`/search?query=${query}`);
  const data = await response.json();

  setupVideoList(data.items);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button').addEventListener('click', searchVideos);
});

import { createVideoCard } from './components/videoCard/videoCard.js';
import { setupSidebar } from './components/sidebar/sidebar.js';

setupSidebar();

async function searchVideos() {
    const query = document.getElementById('query').value;
    const response = await fetch(`/search?query=${query}`);
    const data = await response.json();

    const results = document.getElementById('results');
    results.innerHTML = '';

    data.items.forEach(item => {
        const videoElement = createVideoCard(item);
        results.appendChild(videoElement);
    });
}

document.querySelector('button').addEventListener('click', searchVideos);

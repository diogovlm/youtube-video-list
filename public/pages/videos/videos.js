import { setupVideoList } from '/js/components/videoList/videoList.js';
import { setupPagination } from '/js/components/pagination/pagination.js';

let nextPageToken = null;
let prevPageToken = null;
let currentQuery = '';

async function searchVideos(query = currentQuery, pageToken = '') {
    const response = await fetch(`/search?query=${query}&pageToken=${pageToken}`);
    const data = await response.json();

    nextPageToken = data.nextPageToken || null;
    prevPageToken = data.prevPageToken || null;
    currentQuery = query;

    setupVideoList(data.items, pageToken === '');
    setupPagination(nextPageToken, prevPageToken, handlePageChange);
}

function handlePageChange(pageToken) {
    searchVideos(currentQuery, pageToken);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', () => {
        searchVideos(document.getElementById('query').value);
    });
});
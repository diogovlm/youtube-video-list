import { setupVideoList } from '/js/components/videoList/videoList.js';
import { auth, loadFavorites } from '/js/firebase.js';

async function favoriteVideos() {
  const user = auth.currentUser;
  let favorites = [];
  if (user) {
    favorites = await loadFavorites(user.uid);
  }

  const favoriteVideos = favorites.map(favorite => favorite.video);
  console.log(favoriteVideos)
  setupVideoList(favoriteVideos, true);
}

document.addEventListener('DOMContentLoaded', () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      favoriteVideos(user);
    } else {
      console.log('No user is logged in on DOMContentLoaded');
    }
  });
});
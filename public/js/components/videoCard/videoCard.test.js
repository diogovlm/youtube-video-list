/**
 * @jest-environment jsdom
 */

const { createVideoCard } = require('./videoCard');
const { auth } = require('../../firebase');
const { fireEvent } = require('@testing-library/dom');

jest.mock('../../firebase', () => ({
  auth: {
    currentUser: { uid: 'testUserId' },
  },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Success', newCount: 5 }),
    ok: true,
  })
);

beforeAll(() => {
  window.alert = jest.fn();
});

beforeEach(() => {
  document.body.innerHTML = `
    <div id="favoriteCount">0</div>
  `;
});

describe('createVideoCard', () => {
  const mockVideo = {
    id: { videoId: 'testVideoId' },
    snippet: {
      thumbnails: {
        default: { url: 'http://example.com/thumbnail.jpg' },
      },
    },
  };

  it('should create a video card element', () => {
    const videoCard = createVideoCard(mockVideo);
    document.body.appendChild(videoCard);
    expect(videoCard.querySelector('.video-thumbnail').src).toBe('http://example.com/thumbnail.jpg');
  });

  it('should mark the video as favorited if it is in the favorites', () => {
    const favorites = [{ video: { id: { videoId: 'testVideoId' } } }];
    const videoCard = createVideoCard(mockVideo, favorites);
    document.body.appendChild(videoCard); // Attach the video card to the document
    const starToggle = videoCard.querySelector('.star');
    expect(starToggle.classList).toContain('favorited');
  });

  it('should add video to favorites when star is clicked', async () => {
    const videoCard = createVideoCard(mockVideo);
    document.body.appendChild(videoCard); // Attach the video card to the document
    const starToggle = videoCard.querySelector('.star');
    fireEvent.click(starToggle);
    expect(starToggle.classList).toContain('favorited');
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for promises to resolve
    expect(fetch).toHaveBeenCalledWith('/api/favorites', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ userId: 'testUserId', video: mockVideo }),
    }));
    expect(window.alert).toHaveBeenCalledWith('Success');
  });

  it('should remove video from favorites when star is clicked again', async () => {
    const favorites = [{ video: { id: { videoId: 'testVideoId' } } }];
    const videoCard = createVideoCard(mockVideo, favorites);
    document.body.appendChild(videoCard); // Attach the video card to the document
    const starToggle = videoCard.querySelector('.star');
    fireEvent.click(starToggle);
    expect(starToggle.classList).not.toContain('favorited');
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for promises to resolve
    expect(fetch).toHaveBeenCalledWith('/api/favorites', expect.objectContaining({
      method: 'DELETE',
      body: JSON.stringify({ userId: 'testUserId', video: mockVideo }),
    }));
    expect(window.alert).toHaveBeenCalledWith('Success');
  });
});

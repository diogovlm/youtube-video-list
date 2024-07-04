/**
 * @jest-environment jsdom
 */

const { setupVideoList } = require('./videoList');
const { createVideoCard } = require('../videoCard/videoCard');
const { auth, loadFavorites } = require('../../firebase');
const { fireEvent } = require('@testing-library/dom');

jest.mock('../videoCard/videoCard', () => ({
  createVideoCard: jest.fn(),
}));

jest.mock('../../firebase', () => ({
  auth: {
    currentUser: { uid: 'testUserId' },
  },
  loadFavorites: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('<div class="video-list"></div>'),
  })
);

beforeAll(() => {
  window.alert = jest.fn();
});

beforeEach(() => {
  document.body.innerHTML = `
    <div class="sidebar">
      <span id="favoriteCount" class="favorite-count">0</span>
    </div>
    <div class="video-list-container">
      <div id="videoList" class="video-list"></div>
    </div>
  `;
  // Ensure that auth.currentUser is correctly mocked before each test
  auth.currentUser = { uid: 'testUserId' };
});

describe('setupVideoList', () => {
  const mockVideos = [
    {
      id: { videoId: 'testVideoId1' },
      snippet: {
        thumbnails: {
          default: { url: 'http://example.com/thumbnail1.jpg' },
        },
      },
    },
    {
      id: { videoId: 'testVideoId2' },
      snippet: {
        thumbnails: {
          default: { url: 'http://example.com/thumbnail2.jpg' },
        },
      },
    },
  ];

  it('should load the video list and populate it with video cards', async () => {
    createVideoCard.mockImplementation((video, favorites) => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.textContent = video.id.videoId;
      return card;
    });

    loadFavorites.mockResolvedValue([]);

    await setupVideoList(mockVideos);

    const videoListContainer = document.querySelector('.video-list');
    expect(videoListContainer.children.length).toBe(2);
    expect(videoListContainer.children[0].textContent).toBe('testVideoId1');
    expect(videoListContainer.children[1].textContent).toBe('testVideoId2');
  });

  it('should clear the video list if clear is true', async () => {
    createVideoCard.mockImplementation((video, favorites) => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.textContent = video.id.videoId;
      return card;
    });

    loadFavorites.mockResolvedValue([]);

    document.querySelector('.video-list-container').innerHTML = '<div class="video-list">Old Content</div>';

    await setupVideoList(mockVideos, true);

    const videoListContainer = document.querySelector('.video-list');
    expect(videoListContainer.children.length).toBe(2);
    expect(videoListContainer.children[0].textContent).toBe('testVideoId1');
    expect(videoListContainer.children[1].textContent).toBe('testVideoId2');
  });

  it('should not clear the video list if clear is false', async () => {
    createVideoCard.mockImplementation((video, favorites) => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.textContent = video.id.videoId;
      return card;
    });

    loadFavorites.mockResolvedValue([]);

    document.querySelector('.video-list-container').innerHTML = '<div class="video-list">Old Content</div>';

    await setupVideoList(mockVideos, false);

    const videoListContainer = document.querySelector('.video-list');
    expect(videoListContainer.innerHTML).toContain('Old Content');
    expect(videoListContainer.children.length).toBeGreaterThan(2);
  });
});

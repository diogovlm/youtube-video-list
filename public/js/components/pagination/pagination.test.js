const { setupPagination } = require('./pagination');
const { fireEvent, screen } = require('@testing-library/dom');
require('jest-fetch-mock').enableMocks();

describe('setupPagination', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="pagination-container"></div>
    `;

    fetch.mockResponseOnce(`
      <link rel="stylesheet" href="/js/components/pagination/pagination.css">
      <div class="pagination">
        <button id="prevPage" style="display: none;">Previous</button>
        <button id="nextPage" style="display: none;">Next</button>
      </div>
    `);
  });

  it('should display next and previous buttons if tokens are provided', async () => {
    const mockOnPageChange = jest.fn();

    setupPagination('nextToken', 'prevToken', mockOnPageChange);

    await screen.findByText('Previous');
    await screen.findByText('Next');

    const nextButton = screen.getByText('Next');
    const prevButton = screen.getByText('Previous');

    expect(nextButton).toBeVisible();
    expect(prevButton).toBeVisible();

    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith('nextToken');

    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith('prevToken');
  });

  it('should hide next and previous buttons if tokens are not provided', async () => {
    setupPagination(null, null, jest.fn());

    await screen.findByText('Previous');
    await screen.findByText('Next');

    const nextButton = screen.getByText('Next');
    const prevButton = screen.getByText('Previous');

    expect(nextButton).not.toBeVisible();
    expect(prevButton).not.toBeVisible();
  });
});

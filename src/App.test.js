import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

test('Search button triggers search functionality', () => {
  render(<App />);

  // Mock API fetch and response
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({ results: [] }),
  });

  // Enter search query
  const searchInput = screen.getByRole('textbox');
  userEvent.type(searchInput, 'test query');

  // Select media type
  const mediaTypeSelect = screen.getByRole('combobox');
  userEvent.selectOptions(mediaTypeSelect, 'music');

  // Click search button
  const searchButton = screen.getByRole('button', { name: 'Search' });
  userEvent.click(searchButton);

  // Verify API call is made with correct parameters
  expect(fetch).toHaveBeenCalledWith('/developer.apple.com/search?q=test query&media=music');
});

//testing component matches snapshot
test('App component matches snapshot', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

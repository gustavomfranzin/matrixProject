import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


const response = { speaker: 'Speaker', quote: 'test quote' };

const server = setupServer(
    rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
        return res(ctx.json(response));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders the app with a button, a dialogue', () => {
  render(<App />);
  const buttonE = screen.getByRole('button');
  const text = screen.getByText(/loading/);

  expect(buttonE).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});

test('calls api on button click and update its text', async () => {
    render(<App />);

    const buttonE = screen.getByRole('button');

    fireEvent.click(buttonE);

    const quoteEl = await screen.findByText(response.quote);

    expect(quoteEl).toBeInTheDocument();
});

test('calls api on startup and render it response', async () => {
    render(<App />);

    const quoteEl = await screen.findByText(response.quote);

    expect(quoteEl).toBeInTheDocument();
});
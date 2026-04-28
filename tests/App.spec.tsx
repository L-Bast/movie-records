import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import type { Movie } from "../src/interfaces/movie";
import { watchMovie } from "../src/App";

describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });
});

describe("watchMovie function", () => {
    test("should update the watched status of a movie", () => {
        const movie: Movie = {
            id: "1",
            title: "Test Movie",
            released: 2023,
            description: "Test description",
            rating: 8,
            soundtrack: [],
            watched: { seen: false, liked: false, when: null },
        };
        const updatedMovie = watchMovie(movie, true, true);
        expect(updatedMovie.watched.seen).toBe(true);
        expect(updatedMovie.watched.liked).toBe(true);
        expect(updatedMovie.watched.when).not.toBeNull();
    });
});

describe("setMovieWatched function", () => {
    test("setMovieWatched updates only the targeted movie", () => {
        render(<App />);

        const firstMovieWatchButton = screen.getAllByRole("button", {
            name: /watch/i,
        })[0];
        fireEvent.click(firstMovieWatchButton);

        const watchedElements = screen.getAllByText(/watched/i);
        expect(watchedElements.length).toBeGreaterThan(0);
    });
});

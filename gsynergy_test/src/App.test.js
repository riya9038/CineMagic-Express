import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ErrorScreen } from "./components/ErrorScreen";
import { MovieCard } from "./components/MovieCard";
import { Shimmer } from "./components/Shimmer";
import { MovieDetailsCard } from "./components/MovieDetail";

describe("MovieCard Component", () => {
  const mockData = {
    backdrop_path: "/example-image.jpg",
    original_title: "Example Movie",
    vote_average: 7.5,
    overview: "This is a sample overview for testing purposes.",
  };

  it("renders movie card with provided data", () => {
    render(<MovieCard data={mockData} />);

    const movieTitle = screen.getByText("Example Movie");
    const voteAverage = screen.getByText("7");
    const overview = screen.getByText(
      "This is a sample overview for testing purposes."
    );

    //Test title

    expect(movieTitle).toBeInTheDocument();

    //Test vote_average

    expect(voteAverage).toBeInTheDocument();

    //Test overview

    expect(overview).toBeInTheDocument();
  });

  it("displays '2 lines' text for long overview", () => {
    const longOverviewData = {
      ...mockData,
      overview:
        "A very long overview that exceeds two lines and needs to be truncated.",
    };
    render(<MovieCard data={longOverviewData} />);

    const overview = screen.getByText(
      "A very long overview that exceeds two lines and needs to be truncated."
    );
    const truncatedText = screen.getByText("(2 lines)");

    expect(overview).toBeInTheDocument();
    expect(truncatedText).toBeInTheDocument();
  });

  it("displays image when backdrop_path is provided", () => {
    render(<MovieCard data={mockData} />);

    const movieImage = screen.getByAltText("image");
    expect(movieImage).toBeInTheDocument();
  });
});

describe("Shimmer Component", () => {
  it("renders container shimmer", () => {
    render(<Shimmer parent="container" />);

    //Test shimmer
    const shimmerContainer = screen.getByRole("loader");
    expect(shimmerContainer).toBeInTheDocument();

    //Test shimmer items
    const shimmerItems = screen.getAllByTestId("shimmer-item");
    expect(shimmerItems).toHaveLength(12); // Update this count based on your 'arr' length
  });

  it("renders single item shimmer", () => {
    render(<Shimmer parent="detail" />);

    //Test shimmer
    const shimmerContainer = screen.getByRole("loader");
    expect(shimmerContainer).toBeInTheDocument();

    //Test shimmer item
    const shimmerItem = screen.getByTestId("shimmer-item");
    expect(shimmerItem).toBeInTheDocument();
  });
});

const mockMovie = {
  original_title: "Test Movie",
  genres: [{ name: "Action" }, { name: "Drama" }],
  vote_average: 7.5,
  runtime: 150,
  overview: "This is a test movie overview.",
  release_date: "2023-08-16",
  poster_path: "test-poster.jpg",
};

test("renders movie details correctly", () => {
  const { getByText, getByAltText } = render(
    <MovieDetailsCard movie={mockMovie} />
  );

  // Test movie title
  const titleElement = getByText("Test Movie");
  expect(titleElement).toBeInTheDocument();

  // Test vote average
  const voteAverage = getByText("7.5 Votes");
  expect(voteAverage).toBeInTheDocument();

  // Test overview
  const overview = getByText("This is a test movie overview.");
  expect(overview).toBeInTheDocument();

  // Test release date
  const releaseDate = getByText("2023-08-16");
  expect(releaseDate).toBeInTheDocument();

  // Test poster image
  const posterImage = getByAltText("poster");
  expect(posterImage).toHaveAttribute(
    "src",
    "https://image.tmdb.org/t/p/w300/test-poster.jpg"
  );
});

describe("Error Component", () => {
  it("renders error component", () => {
    render(<ErrorScreen />);
    // Test error image
    const errorImage = screen.getByAltText("Page Not Found");
    expect(errorImage).toBeInTheDocument();
  });
});

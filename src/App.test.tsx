import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./App";

// Mock the LanguageContext to avoid complex setup
vi.mock("./contexts/LanguageContext", () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock components that might have complex dependencies
vi.mock("./components/layout/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navigation</nav>,
}));

vi.mock("./components/ui/Ticker", () => ({
  default: () => <div data-testid="ticker">Ticker</div>,
}));

vi.mock("./components/layout/Footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("./pages/Home", () => ({
  default: () => <main data-testid="home-page">Home Page</main>,
}));

describe("App Component", () => {
  it("renders main layout components", () => {
    render(<App />);

    // Check that main layout components are rendered
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("ticker")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders home page by default", () => {
    render(<App />);

    // Should render the Home component for the root route
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});

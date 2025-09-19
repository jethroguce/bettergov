import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary-500"); // primary variant
    expect(button).toHaveClass("text-base"); // md size
  });

  it("renders different variants correctly", () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-secondary-500");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent", "border");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "bg-transparent",
      "text-gray-700"
    );

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-primary-500");
  });

  it("renders different sizes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-sm", "h-8");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-lg", "h-12");
  });

  it("applies fullWidth prop correctly", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("handles loading state correctly", () => {
    render(<Button isLoading>Loading</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-60", "cursor-not-allowed");

    // Check for loading spinner
    const spinner = button.querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  it("handles disabled state correctly", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-60", "cursor-not-allowed");
  });

  it("renders left and right icons correctly", () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const RightIcon = () => <span data-testid="right-icon">→</span>;

    render(
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        With Icons
      </Button>
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("hides icons when loading", () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const RightIcon = () => <span data-testid="right-icon">→</span>;

    render(
      <Button isLoading leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        Loading
      </Button>
    );

    expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger click when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not trigger click when loading", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} isLoading>
        Loading
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("forwards additional props to button element", () => {
    render(
      <Button data-testid="custom-button" type="submit">
        Submit
      </Button>
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("type", "submit");
  });
});

# Testing Guide

This project uses [Vitest](https://vitest.dev/) as the testing framework with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component testing.

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are co-located with their source files using the `.test.tsx` or `.test.ts` extension:

```
src/
  components/
    ui/
      Button.tsx
      Button.test.tsx  # Tests for Button component
  lib/
    utils.ts
    utils.test.ts     # Tests for utility functions
```

## Writing Tests

### Component Tests

Use React Testing Library for component testing:

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("handles user interactions", () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Unit Tests

For utility functions and pure logic:

```typescript
import { describe, it, expect } from "vitest";
import { myUtilFunction } from "./utils";

describe("myUtilFunction", () => {
  it("returns expected result", () => {
    expect(myUtilFunction("input")).toBe("expected output");
  });
});
```

### Mocking

Use Vitest's built-in mocking capabilities:

```typescript
import { vi } from "vitest";

// Mock a module
vi.mock("./api", () => ({
  fetchData: vi.fn().mockResolvedValue({ data: "mock data" }),
}));

// Mock a function
const mockFn = vi.fn();
mockFn.mockReturnValue("mocked value");
```

## Testing Best Practices

1. **Write descriptive test names** - Test names should clearly describe what is being tested
2. **Follow AAA pattern** - Arrange, Act, Assert
3. **Test behavior, not implementation** - Focus on what the component does, not how it does it
4. **Use data-testid sparingly** - Prefer accessible queries (getByRole, getByLabelText)
5. **Mock external dependencies** - Keep tests isolated and fast
6. **Test edge cases** - Include error conditions and boundary values

## Coverage Goals

- Aim for 80%+ code coverage
- Focus on critical business logic
- Don't chase 100% coverage at the expense of meaningful tests

## Continuous Integration

Tests run automatically on:

- Every pull request
- Every push to main/develop branches
- Before deployment

The CI pipeline will fail if:

- Any test fails
- Code coverage drops below threshold
- TypeScript compilation errors
- ESLint errors

## Configuration

Test configuration is in:

- `vite.config.ts` - Main Vitest configuration
- `src/test/setup.ts` - Global test setup
- `package.json` - Test scripts and dependencies

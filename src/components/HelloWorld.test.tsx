import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import HelloWorld from "./HelloWorld";

describe("HelloWorld", () => {
  it("renders the HelloWorld component", () => {
    render(<HelloWorld />);

    screen.getByText("Vite + React");
  });
});

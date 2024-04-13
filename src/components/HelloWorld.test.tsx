import { render, screen } from "@testing-library/react";
import HelloWorld from "./HelloWorld";

describe("HelloWorld", () => {
  it("renders the HelloWorld component", () => {
    render(<HelloWorld />);

    screen.getByText("Vite + React");
  });
});

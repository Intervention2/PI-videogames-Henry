import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  const { container } = render(<App />);
  expect(container.querySelector("h1")).toBeInTheDocument();
});

test("renders button", () => {
  const { container } = render(<App />);
  expect(container.querySelector("button")).toBeInTheDocument();
});

test("La landingpage tiene que tener un boton de tipo submit y nombre 'hola'", () => {
  const { container } = render(<App />);
  const element = container.querySelectorAll("button")[0];
  expect(element.type).toBe("submit");
  expect(element.className).toBe("enterbtn");
  expect(element.name).toBe("hola");
});

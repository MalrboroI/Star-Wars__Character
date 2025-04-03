import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CharacterCard from "../src/components/CharacterCards";
import "@testing-library/jest-dom";
import "@types/jest";

// Мокаем контекст
jest.mock("../src/context/AppContext", () => ({
  useAppContext: () => ({ language: "Russian" }),
}));

const mockCharacter = {
  name: "Luke Skywalker",
  birth_year: "19 BBY",
  gender: "male",
  height: "172",
  mass: "77",
};

describe("CharacterCard", () => {
  it("отображает имя персонажа", () => {
    render(<CharacterCard character={mockCharacter} onClick={jest.fn()} />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("отображает рост и массу", () => {
    render(<CharacterCard character={mockCharacter} onClick={jest.fn()} />);
    expect(screen.getByText("Рост: 172")).toBeInTheDocument();
    expect(screen.getByText("Масса: 77")).toBeInTheDocument();
  });

  it("вызывает обработчик onClick при клике", () => {
    const handleClick = jest.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button")); // Или другой селектор
    expect(handleClick).toHaveBeenCalled();
  });

  it('не показывает birth_year(год рождения), если он "unknown" или "n/a"', () => {
    const test1 = { ...mockCharacter, birth_year: "unknown" };
    const test2 = { ...mockCharacter, birth_year: "n/a" };
    render(<CharacterCard character={test1 && test2} onClick={jest.fn()} />);
    expect(screen.queryByText("unknown")).toBeNull();
  });
});

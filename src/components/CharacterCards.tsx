import React from "react";
import { useAppContext } from "../context/AppContext";
import { CharacterCardProps } from "../globalTypes/Types";

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
}) => {
  const { language } = useAppContext();

  return (
    <div className="character-card" onClick={onClick}>
      <h3 className="character-card__title">{character.name}</h3>
      <div className="character-card__info">
        {character.birth_year !== "unknown" &&
          character.birth_year !== "n/a" && (
            <span className="character-card__tag character-card__tag--birth">
              {character.birth_year}
            </span>
          )}
        {character.gender !== "n/a" && character.gender !== "unknown" && (
          <span
            className={`character-card__tag character-card__tag--${character.gender}`}
          >
            {character.gender}
          </span>
        )}
      </div>
      <div className="character-card__details">
        <p>
          {language === "Russian" ? "Рост: " : "Acwoahrracao: "}
          {character.height}
        </p>
        <p>
          {language === "Russian" ? "Масса: " : "Scracc: "} {character.mass}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;

import React from "react";
import { CharacterCardProps } from "../globalTypes/Types";

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
}) => {
  return (
    <div className="character-card" onClick={onClick}>
      <h3 className="character-card__title">{character.name}</h3>
      <div className="character-card__info">
        {character.birth_year !== "unknown" && (
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
        <p>Рост: {character.height}</p>
        <p>Вес: {character.mass}</p>
      </div>
    </div>
  );
};

export default CharacterCard;

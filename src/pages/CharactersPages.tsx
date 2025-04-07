import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FetchCharacters } from "../components/ServiceAPI/Api";
import CharacterCard from "../components/CharacterCards";
import Modal from "../components/Modals";
import Loader from "../components/Module/Loader";
import Filter from "../components/Module/Filter";
import LoadImage from "../image/Frame 1.svg";
import { Character, Nullable } from "../globalTypes/Types";

const CharactersPage: React.FC = () => {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<Nullable<Character>>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const loadCharacters = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const data = await FetchCharacters(currentPage, language);

      // API странно себя ведёт, и чтобы не было повторения одинаковой информации с апишки, пришлось ввести фильтрацию по уже добавленым, чтобы не было повторений

      setCharacters((prev) => {
        const existingIds = new Set(prev.map((char) => char.name));
        const newCharacters = data.results.filter(
          (char: Character) => !existingIds.has(char.name)
        );
        return [...prev, ...newCharacters];
      });
      setFilteredCharacters((prev) => [...prev, ...data.results]);
      setHasMore(data.next !== null);
      setTotalCount(data.count);
    } catch (error) {
      console.error("Ошибка при загрузки карточек пресонажей:", error);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  }, [currentPage, language, hasMore, navigate]);

  useEffect(() => {
    if (genderFilter === "all") {
      setFilteredCharacters(characters);
    } else {
      setFilteredCharacters(
        characters.filter((char) => char.gender === genderFilter)
      );
    }
  }, [genderFilter, characters]);

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleCardClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  return (
    <div className="characters-page">
      <h1 className="characters-page__title">
        {totalCount}{" "}
        {language === "Russian" ? "Персонажей для выбора" : "rcwochuanaoc"}
      </h1>

      <Filter
        options={[
          { value: "all", label: language === "Russian" ? "Все" : "Roo" },
          {
            value: "male",
            label: language === "Russian" ? "Мужской" : "Aarrrgghh",
          },
          {
            value: "female",
            label: language === "Russian" ? "Женский" : "Rrraaarr wrrrraaw",
          },
          {
            value: "hermaphrodite",
            label: language === "Russian" ? "Гермафродит" : "Rrrrwwww",
          },
          { value: "n/a", label: language === "Russian" ? "Нет" : "Urrah" },
        ]}
        selectedValue={genderFilter}
        onChange={setGenderFilter}
      />

      {loading && currentPage === 1 ? (
        <Loader />
      ) : (
        <div className="characters-page__grid">
          {filteredCharacters.map((character, index) => (
            <CharacterCard
              key={`${character.birth_year}+${index}`}
              character={character}
              onClick={() => handleCardClick(character)}
            />
          ))}
        </div>
      )}

      {currentPage * 10 < totalCount &&
        (loading ? (
          <Loader />
        ) : (
          <button
            className="characters-page__load-more "
            onClick={handleLoadMore}
            disabled={loading}
          >
            <img src={LoadImage} alt="load" />
          </button>
        ))}

      {selectedCharacter && (
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          character={selectedCharacter}
        />
      )}
    </div>
  );
};

export default CharactersPage;

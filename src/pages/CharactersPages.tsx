import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { fetchCharacters } from "../components/serviceAPI/Api";
import CharacterCard from "../components/CharacterCards";
import Modal from "../components/Utils/Modals";
import Loader from "../components/Utils/Loader";
import Filter from "../components/Utils/Filter";
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

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacters(currentPage, language);
        setCharacters((prev) => [...prev, ...data.results]);
        setFilteredCharacters((prev) => [...prev, ...data.results]);
        setTotalCount(data.count);
      } catch (error) {
        console.error("Ошибка при загрузки карточек пресонажей:", error);
        navigate("/Network_Error");
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [currentPage, language, navigate]);

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
    setCurrentPage((prev) => prev + 1);
  };

  const handleCardClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="characters-page">
      <h1 className="characters-page__title">
        {totalCount}{" "}
        {language === "Russian" ? "Персонажей для выбора" : "rcwochuanaoc"}
      </h1>

      <Filter
        options={[
          { value: "all", label: language === "Russian" ? "Все" : "rahow" },
          {
            value: "male",
            label: language === "Russian" ? "Мужской" : "scraanwo",
          },
          {
            value: "female",
            label: language === "Russian" ? "Женский" : "wwwoscraanwo",
          },
          {
            value: "hermaphrodite",
            label: language === "Russian" ? "Гермафродит" : "akwooo",
          },
          { value: "none", label: language === "Russian" ? "Нет" : "wh/ra" },
        ]}
        selectedValue={genderFilter}
        onChange={setGenderFilter}
      />

      {loading && currentPage === 1 ? (
        <Loader />
      ) : (
        <div className="characters-page__grid">
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={`${character.birth_year}+${character.mass}`}
              character={character}
              onClick={() => handleCardClick(character)}
            />
          ))}
        </div>
      )}

      {currentPage * 9 < totalCount && (
        <button
          className="characters-page__load-more "
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading
            ? language === "Russian"
              ? "Загрузка..."
              : "oaoahuwhao..."
            : language === "Russian"
            ? "Загрузить еще"
            : "oaoahuwhao rcwochuanaoc"}
        </button>
      )}

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

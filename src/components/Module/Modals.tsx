import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalProps } from "../../globalTypes/Types";
import { FetchCharacterImage } from "../ServiceAPI/Api";
import { useAppContext } from "../../context/AppContext";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "./Loader";
import MaleImage from "../../image/IconMale.svg";
import FemeleImage from "../../image/IconFemale.svg";

const Modal: React.FC<ModalProps> = ({ open, onClose, character }) => {
  const { language } = useAppContext();
  const navigate = useNavigate();

  const [imageData, setImageData] = useState<{
    image?: string;
    description?: string;
    loading: boolean;
    error?: string;
  }>({ loading: false });

  useEffect(() => {
    const loadCharacterImage = async () => {
      if (open && character) {
        setImageData({ loading: true });
        try {
          const data = await FetchCharacterImage(character.name);

          if (data) {
            setImageData({
              image: data.image,
              description: data.description,
              loading: false,
            });
          } else {
            setImageData({
              loading: false,
              error: "Изображение не найдено",
            });
          }
        } catch (error) {
          console.error("Ошибка загрузки изображения:", error);
          setImageData({
            loading: false,
            error: "Ошибка загрузки изображения",
          });
          navigate("/Network_Error");
        }
      }
    };

    // Сбрасываем состояние при закрытии модального окна
    if (!open) {
      setImageData({ loading: false });
    } else {
      loadCharacterImage();
    }
  }, [open, character, navigate]);

  if (!character) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="character-modal"
    >
      <DialogTitle className="character-modal__header">
        <p className="gender-image">
          {character.name}
          {character.gender === "female" ? (
            <img className="gender-image__svg" src={MaleImage} alt="" />
          ) : character.gender === "male" ? (
            <img className="gender-image__svg" src={FemeleImage} alt="" />
          ) : null}
        </p>

        <IconButton
          aria-label="close"
          onClick={onClose}
          className="close-button"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="character-modal__content">
        <div className="character-modal__content__image-container">
          {imageData.loading ? (
            <Loader />
          ) : imageData.error ? (
            <div className="image-error">
              <img
                src="/placeholder.jpg"
                alt="Заглушка"
                className="character-image"
              />
              <p className="error-text">{imageData.error}</p>
            </div>
          ) : imageData.image ? (
            <img
              src={imageData.image}
              alt={character.name}
              className="character-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg";
                setImageData((prev) => ({
                  ...prev,
                  error: "Ошибка загрузки изображения",
                }));
              }}
            />
          ) : (
            <div className="image-placeholder">
              <img
                src="/placeholder.jpg"
                alt="Заглушка"
                className="character-image"
              />
            </div>
          )}
        </div>

        <div className="character-modal__content__info">
          <div className="info-row">
            <span className="info-label">
              {language === "Russian" ? "Рост: " : "Acwoahrracao: "}:
            </span>
            <span>{character.height}</span>
          </div>
          <div className="info-row">
            <span className="info-label">
              {language === "Russian" ? "Вес: " : "Scracc: "}
            </span>
            <span>{character.mass}</span>
          </div>
          {character.birth_year !== "n/a" &&
            character.birth_year !== "unknown" &&
            character.birth_year !== "huwhorwhooohwh" && (
              <div className="info-row">
                <span className="info-label">
                  {language === "Russian"
                    ? "Год рождения: "
                    : "Rhahrcaoac_roworarc: "}
                </span>
                <span>{character.birth_year}</span>
              </div>
            )}
          {character.gender !== "n/a" &&
            character.gender !== "unknown" &&
            character.gender !== "wh/ra" && (
              <div className="info-row">
                <span className="info-label">
                  {language === "Russian" ? "Пол: " : "Rrwowhwaworc: "}
                </span>
                <span>{character.gender}</span>
              </div>
            )}
        </div>

        {imageData.description && (
          <div className="description-section">
            <h3 className="description-section__title">
              {language === "Russian" ? "Описание" : "Grrrroooowwwww"}
            </h3>
            <p className="description-section__text">{imageData.description}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

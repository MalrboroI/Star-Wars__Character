import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalProps } from "../../globalTypes/Types";
import { fetchCharacterImage } from "../serviceAPI/Api";
import Loader from "./Loader";

const Modal: React.FC<ModalProps> = ({ open, onClose, character }) => {
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
          const data = await fetchCharacterImage(character.name);

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
        }
      }
    };

    // Сбрасываем состояние при закрытии модального окна
    if (!open) {
      setImageData({ loading: false });
    } else {
      loadCharacterImage();
    }
  }, [open, character]);

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
        {character.name}
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
            <span className="info-label">Рост:</span>
            <span>{character.height}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Вес:</span>
            <span>{character.mass}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Год рождения:</span>
            <span>{character.birth_year}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Пол:</span>
            <span>{character.gender}</span>
          </div>
        </div>

        {imageData.description && (
          <div className="description-section">
            <h3 className="description-section__title">Описание</h3>
            <p className="description-section__text">{imageData.description}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

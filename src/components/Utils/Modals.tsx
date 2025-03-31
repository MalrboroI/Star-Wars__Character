import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Typography,
  // Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Character } from "../../globalTypes/Types";
import { fetchRandomCharacterImage } from "../serviceAPI/Api";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  character: Character | null;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, character }) => {
  const [imageData, setImageData] = useState<{
    image?: string;
    description?: string;
    loading: boolean;
  }>({ loading: false });

  useEffect(() => {
    const loadRandomImage = async () => {
      if (open) {
        setImageData({ loading: true });
        const data = await fetchRandomCharacterImage();
        setImageData({
          image: data?.image,
          description: data?.description,
          loading: false,
        });
      }
    };

    loadRandomImage();
  }, [open]);

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
          className="character-modal__close-button"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className="character-modal__content">
        <div className="character-modal__content__image-container">
          {imageData.loading ? (
            <div className="loading-container">
              <CircularProgress />
              <Typography>Загрузка данных...</Typography>
            </div>
          ) : imageData.image ? (
            <img
              src={imageData.image}
              alt={character.name}
              className="character-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg";
              }}
            />
          ) : (
            <div className="image-placeholder">Изображение не найдено</div>
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

          {imageData.description && (
            <div className="description-section">
              <h3 className="description-section__title">Описание</h3>
              <p className="description-section__text">
                {imageData.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

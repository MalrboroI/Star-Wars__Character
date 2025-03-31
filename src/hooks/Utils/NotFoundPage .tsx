import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { errorMessage, errorDetails } = location.state || {
    errorMessage: "Произошла неизвестная ошибка",
    errorDetails: "",
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>Ошибка</h1>
        <div className="error-icon">⚠️</div>
        <h2>{errorMessage}</h2>
        {errorDetails && <p className="error-details">{errorDetails}</p>}

        <div className="action-buttons">
          <button onClick={() => navigate(-1)} className="back-button">
            Вернуться назад
          </button>
          <button onClick={() => navigate("/")} className="home-button">
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

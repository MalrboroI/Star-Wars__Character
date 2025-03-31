import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <p className="loader__text">Идёт загрузка...</p>
    </div>
  );
};

export default Loader;

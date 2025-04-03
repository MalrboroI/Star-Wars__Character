import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div>
        <CircularProgress />
      </div>
      <Typography className="loader__text">Загрузка данных...</Typography>
    </div>
  );
};

export default Loader;

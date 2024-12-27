import React, { useState } from 'react';
import './CustomSlider.css'; // Importamos los estilos

const CustomSlider = () => {
  const [sliderValue, setSliderValue] = useState(50); // Valor del slider

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  return (
    <div className="slider-container">
      <h2>Slider Personalizado con FaHeart</h2>
      <input
        type="range"
        className="slider"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <div className="slider-value">
        <p>Valor: {sliderValue}</p>
      </div>
    </div>
  );
};

export default CustomSlider;

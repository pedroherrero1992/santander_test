'use client';

import React from "react";
import { useMyContext } from "@/contexs/Context";// Importamos el hook para acceder al contexto
import { FaPowerOff } from "react-icons/fa";

const ShowData = () => {
  const { showData, data } = useMyContext(); // Accedemos al contexto

  if (!showData) {
    return null; // Si showData es false, no se renderiza nada
  }

  return (
    <div style={{marginTop:40}}>
        <FaPowerOff /><h1>El icono de power activa o desactiva este componente, se agrego para cumplir con el requisito de almacenar data en un contex o storage</h1>
      <h3>Datos Guardados:</h3>
      {data.length > 0 ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // Mostrar los datos guardados en formato JSON
      ) : (
        <p>No hay datos guardados.</p> // Mensaje cuando no hay datos
      )}
    </div>
  );
};

export default ShowData;

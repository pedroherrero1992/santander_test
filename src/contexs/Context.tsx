'use client';
import React, { createContext, ReactNode, useState } from 'react';

interface Bien {
  tipo: string;
  marca: string;
  anno: string;
  modelo: string;
  tasa: string;
  amortizacion: string;
  cuotas: string;
  montoFinanciar: number;
}

interface MyContextType {
  data: Bien[];
  showData: boolean;
  addData: (newBien: Bien) => void;
  toggleShowData: () => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<Bien[]>([]);
  const [showData, setShowData] = useState<boolean>(true);

  const addData = (newBien: Bien) => {
    setData((prevData) => [...prevData, newBien]);
  };

  const toggleShowData = () => {
    setShowData((prevShowData) => !prevShowData); // Alterna el valor de `showData`
  };

  return (
    <MyContext.Provider value={{ data, showData, addData, toggleShowData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = React.useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

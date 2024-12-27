// src/Context.tsx
'use client';
import React, { createContext, ReactNode } from 'react';

// Crear un contexto vacío
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyContext = createContext<any>(null);

// Crear un proveedor para envolver los componentes
interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  return <MyContext.Provider value={null}>{children}</MyContext.Provider>;
};
"use client";

import React, { useState } from "react";
import './NavBar.css';
import Image from 'next/image';

import { IoMenu } from "react-icons/io5";
import { CiBellOn, CiBellOff } from "react-icons/ci";
import { FaPowerOff } from "react-icons/fa";
import logo from '../../../public/logo.png'
import logoSM from '../../../public/logoSM.png'
import { useMyContext } from "@/contexs/Context";

// Navbar Component
const Navbar = () => {
  const [bellOn, setBellOn] = useState(true); 
  const [powerOn, setPowerOn] = useState(false); 
  const { toggleShowData } = useMyContext(); 


  const handleBellClick = () => {
    setBellOn(prev => !prev); 
  };

  const handlePowerClick = () => {
    toggleShowData(); // Llamamos a la función toggleShowData al hacer clic en Power Off
    setPowerOn(prev => !prev); // Cambia el estado de powerOn
  };

  return (
    <nav className="navbar">
      <div className="divWraperFS">
        <div className="iconStyle">
          <IoMenu style={{ fontSize: '24px', color: 'black', marginRight:10 }} />
        </div>
        <span  className="hideElement"> Menu </span>
     
       
      </div>


      <div className="">
      <Image src={logo} alt="description"
                    width={200}
                    height={50} 
                    className="hideElement"
                    />
      <Image src={logoSM} alt="description"
                    width={24}
                    height={24} 
                    className="showElement"
                    />
      </div>


      <div className="divWraperFE">
       
        <span className="hideElement">Ir a Panel</span>
        <div className="iconStyle" onClick={handleBellClick}>
          {bellOn ? (
            <CiBellOn style={{ fontSize: '24px', color: 'black', marginInline:10 }} />
          ) : (
            <CiBellOff style={{ fontSize: '24px', color: 'black', marginInline:10 }} />
          )}
        </div>
        <div className="iconStyle">
          <FaPowerOff onClick={handlePowerClick} style={{ fontSize: '24px', color: powerOn ? 'blue' : 'black' }} />
        </div>
      </div>

    
    </nav>
  );
};

export default Navbar;
function setPowerClicked(arg0: (prev: any) => boolean) {
  throw new Error("Function not implemented.");
}


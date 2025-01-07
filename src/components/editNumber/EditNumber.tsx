import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.png'

import { IoAlertCircleOutline } from "react-icons/io5";



// Modal componente
export const EditNumber = ({ isOpen, min, max, onClose, setValue }: { min: number, max: number, isOpen: boolean, onClose: () => void, setValue: React.Dispatch<React.SetStateAction<number>> }) => {
  
  
    const [bgColor, setBgColor] = useState('white'); 
    const [bgColorSave, setBgColorSave] = useState('red'); 
    const [inputNumber, setInputNumber] = useState(0)
    const handleSave = () => {
            
        const result = inputNumber * 100 / max
        setValue(result)
        setInputNumber(0)
        onClose()
        

    }
    if (!isOpen) return null; 

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>

            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                minHeight:300,
                width: '300px',
                 display: 'flex', 
                 flexDirection:"column",
                 alignItems: " center",
                 justifyContent:"space-around"

            }}>



                <Image src={logo} alt="description"
                    width={200}
                    height={50} 
                    
                    />

                <h2>Monto a financiar</h2>


                {inputNumber > max && <span style={{ display: 'flex',  }}><IoAlertCircleOutline style={{ color: 'red', marginRight: '5px',marginTop:5 }} /> El monto debe ser menor a : {max}</span>}
                {inputNumber < min && inputNumber !== 0 && <span style={{ display: 'flex',}}><IoAlertCircleOutline style={{ color: 'red', marginRight: '5px',marginTop:5 }} /> El monto debe ser mayor a : {min}</span>}
                {inputNumber === 0 && <span style={{ display: 'flex', alignItems: " center", alignContent: "center", justifyContent: "flex-start" }}><IoAlertCircleOutline style={{ color: 'red', marginRight: '5px' }} /> Debe ingresar un valor</span>}


                <input
                    type="number"
                    placeholder="Monto"
                    value={inputNumber}
                    onChange={(e) => { setInputNumber(Number(e.target.value)) }}
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginBottom: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        textAlign:"center"
                    }}
                />
                <div style={{
                   
                }}>



                    <button onClick={()=>{onClose()
                        setInputNumber(0)
                    }} style={{
                        padding: '10px 20px',
                        marginRight:5,
                        borderRadius: '50px',
                        border: '2px solid red',
                        cursor: 'pointer',
                        backgroundColor: bgColor,
                        color: bgColor !== 'white' ? 'white' : 'red',
                    }}
                        onMouseEnter={() => { setBgColor('red') }}
                        onMouseLeave={() => { setBgColor('white') }}


                    >
                        Cerrar
                    </button>


                    <button onClick={() => { handleSave() }} style={{
                        padding: '10px 20px',
                        borderRadius: '50px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: inputNumber > min && inputNumber < max ? bgColorSave : 'grey',
                        color: 'white',
                    }}
                        disabled={inputNumber < min && inputNumber > max}
                        onMouseEnter={() => {
                            if (inputNumber > min && inputNumber < max) { setBgColorSave('#FF6262'); }
                        }}
                        onMouseLeave={() => {
                            if (inputNumber > min && inputNumber < max) {
                                setBgColorSave('red');
                            }
                        }}


                    >
                        Guardar
                    </button>

                </div>
            </div>
        </div>
    );
};

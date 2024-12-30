import React from 'react'
import { BienView } from '../bien/BienView'
import Navbar from '@/components/navBar/NavBar'


export const Principal = () => {



    return (
        <div className="principal-container">
            <Navbar  />
            <BienView ></BienView>
        </div>
    )
}



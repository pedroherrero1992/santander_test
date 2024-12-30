import React from 'react'
import { BienView } from '../bien/BienView'
import Navbar from '@/components/navBar/NavBar'
import ShowData from '@/components/showData/showData'


export const Principal = () => {



    return (
        <div className="principal-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Navbar  />
            <BienView ></BienView>
            <ShowData></ShowData>
        </div>
    )
}



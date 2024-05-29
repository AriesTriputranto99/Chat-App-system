import React from 'react'
import logo from '../pic/logo.png'

export const AuthLayout = ({children}) => {
  return (
    <>
    <header className='flex justify-center items-center py-3 h-30 shadow-md'>
        <img
        src={logo}
        alt='logo'
        width={180}
        height={60}
        />
    </header>
    
    { children }
    </>
  )
}

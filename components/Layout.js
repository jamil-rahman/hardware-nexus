import React from 'react'
import NavBar from './NavBar'

export default function Layout({children}) {
    return (
        <div>
           <NavBar />
           <div className="container justify-end">
               {children}
            </div>
        </div>
    )
}

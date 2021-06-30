import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavBar() {
    //checking if user is active or not
    const router = useRouter();
    const isActive = (r) =>{
        if(r===router.pathname) "active";
        "";
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="index">
            <a className="navbar-brand">HardWare Nexus</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
         
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">

                {/* <li className="nav-item active">
                    <Link href="/cart">
                    <a className="nav-link"><i className="fa fa-shopping-bag"></i>Cart</a>
                    </Link>
                </li> */}


                <li className="nav-item ">
                    <Link href="/signin">
                <a className={"nav-link" + isActive('/signin')}>
                    <i className="fa fa-user" aria-hidden="true"></i>SignIn
                    </a>
                    </Link>
                </li>

                {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Username
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">LogOut</a>
                    </div>
                </li> */}

                </ul>
            </div>
        </nav>
    )
}

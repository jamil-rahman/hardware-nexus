import React, {useContext, useState} from 'react'
import { DataContext } from '../store/GlobalState'
import Head from 'next/head'
import Link from 'next/dist/client/link'
export default function profile() {
    
    const initialState = {
        avatar: "",
        name: '',
        password: "",
        cf_password: "",
        contact_number: ""
    }

    const [data,setData] =  useState(initialState)
    const {avatar, name, password, cf_password, contact_number} = data

    const {state, dispatch} = useContext(DataContext)
    const {auth} =  state;

    if(!auth.user){
        return(
            <div className="profile_page">
                <Head>
                    <title>Oops!</title>
                </Head>
                <div className="row d-flex align-items-center justify-content-center" style={{top : "50%", left:"50%", position:"absolute", transform: "translate(-50%, -50%)"}}>
                    <h1>It seems you have entered forbidden grounds</h1>
                
                    <h3 className="my-5">If you have an account, try <Link href="/signin"><a style={{color:"crimson"}}>logging in </a></Link> for from here</h3>
                    <br/>
                    <h3 className="my-3">Or, If you don't have an account, you can <Link href="/register"><a style={{color:"crimson"}}>sign-up </a></Link>from here</h3>

                </div>
            </div>
        )
    }
    return (
        <div className="profile_page">
            <Head>
                <title>Profile</title>
            </Head>

            <section className="row text-secondary my-5">
                <div className="col-md-4">

                    <h3 className="text-center text-uppercase">My Profile</h3>

                    <div className="avatar">
                        <img src={auth.user.avatar} alt={auth.user.avatar}></img>
                        <span>
                            <i className="fa fa-camera" />
                            <p>Change avatar</p>
                            <input type="file" name="file" id="file_up"></input>
                        </span>
                    </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={name} className="form-control" placeholder="Your Name" />
                        </div>
{/* 9:43 */}


                    
                </div>

                <div className="col-md-8">
                    <h3>{auth.user.name} </h3>  <i className="fa fa-map-marker"> location</i>
                </div>

            </section>
            
        </div>
    )

}
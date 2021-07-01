import React, {useState, useContext} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import validation from '../server/utilities/validation'
import { DataContext } from '../store/GlobalState'
import { postData } from '../server/utilities/userFetchData'


export default function Register() {
    const initialState = {
        name: "",
        email: "",
        pw: "",
        cf_pw: "",
    }
    const [userData, setUserData] = useState(initialState);
    const { name, email, pw, cf_pw } = userData;

    const [state, dispatch] = useContext(DataContext);

    //takes in account for change in fields
    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]:value});
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    //on pressing register now button, my state is updated to show 
    //successful registration or not 
    const handleSubmit = async e =>{
        e.preventDefault();
        const errMsg = validation(name, email, pw, cf_pw);
        if(errMsg) return dispatch({type: 'NOTIFY', payload: {error: errMsg} });
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        // console.log(userData);
        const res = await postData("server/authentication/register", userData);
        
        console.log(res);
    }

    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            
            <form className="mx-auto my-4" style={{maxWidth: "500px"}} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name  <span style={{color:"crimson"}}>*</span></label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChangeInput} placeholder="Enter your name"/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address  <span style={{color:"crimson"}}>*</span></label>
                    <input type="email" className="form-control" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChangeInput} name="email" value={email} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password <span style={{color:"crimson"}}>*</span></label>
                    <input type="password" className="form-control" value={pw} id="exampleInputPassword1" placeholder="Password" onChange={handleChangeInput} name="pw" value={pw}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Confirm your Password  <span style={{color:"crimson"}}>*</span></label>
                    <input type="password" className="form-control" value={cf_pw} id="exampleInputPassword2" onChange={handleChangeInput} name="cf_pw" value={cf_pw} />
                </div>


                <button type="submit" className="btn btn-dark w-100 my-2">Register Now</button>
                <p className="my-2 text-muted"> <span style={{color:"crimson"}}>*</span> Fields are required</p>
                <p className="my-2">Already have an account?   
                <Link href="/signin"><a style={{color:"crimson"}}>
                Sign-In here!
                </a>
                </Link>
                </p>
            </form>

        </div>
    )
}

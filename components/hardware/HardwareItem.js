import React from 'react'
import Link from 'next/link'

export default function HardwareItem({item}) {
    console.log(item);
    const userLink = () =>{
        return(
            <>
                <Link href={`item/${item._id}`}>
                <a className="btn btn-info">View Listing</a>
                </Link>
            </>
        )
    }
    
    return (
        <div className="card mb-4" style={{width: "70rem"}}>
            <img src={item.images[0].url} className="card-img-top" alt={item.images[0].url} style={{height: "20rem"}}/>
            <div className="card-body">
                <h5 className="card-title" title={item.title}>{item.title} | <span style={{color: "#A9A9A9"}}>{item.location} </span></h5>
                <div className="d-flex flex-row bd-highlight mb-1">
                <subtitle className="d-flex justify-content-start"><span style={{fontWeight: "900"}}>৳</span>{item.price}</subtitle>
                
                </div>
                {
                    (item.available===true)
                    ? <subtitle className="text-success d-flex justify-content-start"> Item is available</subtitle>
                    : <subtitle className="text-danger d-flex justify-content-start"> Item is not available</subtitle>
                }
                <p className="card-text">{item.description}</p>
                <div className="row justify-content-center">
                    {userLink()}
                </div>
            </div>
        </div>
    )
}
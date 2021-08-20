import Head from 'next/head'
import { useState } from 'react';
import { getData } from '../../utils/fetchData';
import { capitalize_first_letter, addComma } from '../../utils/toCapitalCase';

const DetailedProduct = (props) =>{
    const [item] = useState(props.item)
    const [tab, setTab] = useState(0)

    const isActive = (index) =>{
        if(tab === index)return "active"
        return 
    }
    return(
        <div className="row detail_page" style={{backgroundColor: `rgb(255,255,255)`}}>
            <Head>
                <title>Hardware Details</title>
            </Head>

       {/* Displaying my images of products */}

        <div className="col-md-6">
               <img src={ item.images[tab].url } alt={ item.images[tab].url } 
               className="d-block img-thumbnail rounded mt-4 w-100"
               style={{ height: "350px" }} />

               <div className="row mx-0" style={{ cursor: "pointer" }}>
                   {item.images.map((img, index)=>(
                       <img key={ index } src={ img.url } alt={ img.url }
                       className= {`img-thumbnail rounded ${isActive(index)}`} 
                       style={{ height:"80px", width: "20%" }}
                        onClick={()=>setTab(index)}   
                    />
                   ))}
               </div>

           </div>

        
        <div className="col-md-6 mt-3">
            <h2 className="text-uppercase" style={{ fontFamily:"Advent Pro"}}>{ item.title }</h2>
            <div className="row mx-0 d-flex justify-content-between">
                <div>
                    <lable><strong>Price:</strong></lable>
                        <h5 className="text-success" style={{fontSize:"4rem"}}> ৳{ addComma(item.price) }</h5>
                </div>
            {/* <h6 className="text-secondary"><strong><u>Location</u></strong></h6> */}
            </div>
        {/* <div className="row mx-0 d-flex justify-content-between">
        {
                    (item.available===true)
                    ? <h6 className="text-success d-flex justify-content-start"> Item is available</h6>
                    : <h6 className="text-danger d-flex justify-content-start"> Item is not available</h6>
        }
        <h6 className="text-secondary">{to_capital_case(item.location)}</h6>
        </div> */}
        
        <div className="description my-2">
            <label style={{ color:"#7A2021"}}><strong>ITEM DESCRIPTION</strong></label>
                <div className="my-1">
                    {capitalize_first_letter(item.description)}
                </div>
        </div>

        {/* add contact info of user if given */}
        <div className="contact-info my-4">
            {
                (item.contact_number)
           ?<span><strong>Contact Number:</strong> 0{item.contact_number}</span>
           : <span className="text-danger">Contact info is not given</span>
            }
        </div>


        </div>
        </div>
    )
}


export async function getServerSideProps({params: {id}}){
    const res = await getData(`item/${id}`)
    console.log(res);
    return{
      props: {
        item: res.item
      },  //will be passed to the page component as props
    }
  }

export default DetailedProduct

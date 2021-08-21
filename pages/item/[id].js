import Head from 'next/head'
import { useState } from 'react';
import { getData } from '../../utils/fetchData';
import { capitalize_first_letter, addComma, to_capital_case } from '../../utils/toCapitalCase';

const DetailedProduct = (props) =>{
    const [item] = useState(props.item)
    const [tab, setTab] = useState(0)

    const isActive = (index) =>{
        if(tab === index)return "active"
        return 
    }
    return(
        <div style={{body: "rgba(10, 10, 10, 0.719);"}}>
        <div className="row detail_page" >
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
            <h2 className="text-uppercase" style={{ fontFamily:"Advent Pro", color:"white"}}>{ item.title }</h2>
            <div className="row mx-0 d-flex justify-content-between">
                <div>
                    <label style={{color:"white"}}><strong>Price:</strong></label>
                        <h5 className="text-success" style={{fontSize:"4rem",fontWeight:"500"}}>৳ <span style={{fontFamily:"'Kameron', serif"}}>{addComma(item.price) } </span></h5>
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
            <label style={{ color:"red", fontFamily: "'Kaemron', serif"}}><strong>ITEM DESCRIPTION</strong></label>
                <div className="my-1" style={{color:"white", textAlign: "justify",
                    textJustify: "inter-word"}}>
                    {capitalize_first_letter(item.description)}
                </div>
        </div>

        {/* add contact info of user if given */}
        <div className="contact-info my-4">
            {
                (item.contact_number)
           ?<span style={{color:"white"}}><strong>Contact Number:</strong> 0{item.contact_number}</span>
           : <span className="text-danger">Contact info is not given</span>
            }
        </div>

        <div className="location-detail my-4">
            {
                (item.location)
           ?<span style={{color:"#4267B2", fontWeight:'600'}}><strong>Location:</strong> {to_capital_case(item.location)}</span>
           : <span className="text-danger">Location is not provided</span>
            }
        </div>

        </div>
        </div>
        </div>
    )
}


export async function getServerSideProps({params: {id}}){
    const res = await getData(`item/${id}`)
    // console.log(res);
    return{
      props: {
        item: res.item
      },  //will be passed to the page component as props
    }
  }

export default DetailedProduct

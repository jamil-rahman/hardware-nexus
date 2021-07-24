import Head from 'next/head'
import {useState} from 'react'
import {getData} from '../utils/fetchData'
import HardwareItem from '../components/hardware/HardwareItem';

export default function Home(props) {

  const [items,setItems] = useState(props.items);
  console.log(items);
  return (
    <div>
      <Head>
        <title>The Nexus</title>
      </Head>  
      {
        items.length === 0 
        ? <h2>No items available</h2>
        : items.map(item =>(
          <HardwareItem key={item._id} item={item} />
        ))
      }  
    </div>
  )
}

export async function getServerSideProps(context){
  const res = await getData('item')
  console.log(res);
  return{
    props: {
      items: res.items,
      result: res.result
    },  //will be passed to the page component as props
  }
}
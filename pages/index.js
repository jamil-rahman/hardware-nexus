import Head from 'next/head'
import {useState, useEffect} from 'react'
import {getData} from '../utils/fetchData'
import HardwareItem from '../components/hardware/HardwareItem';
import { filtering } from '../utils/filtering';
import { useRouter } from 'next/router';
export default function Home(props) {

  const [items,setItems] = useState(props.items);
  const [page, setPage] = useState(1)
  const router = useRouter();

  useEffect(() => {
    setItems(props.items)
  }, [props.items])

  useEffect(() => {
    if(Object.keys(router.query).lenght===0) setPage(1)
    // {
     
    // }else{
    //   setPage(Number(router.query.page))
    // }
    
  }, [router.query])

  const handleLoadMore = () =>{
      setPage(page + 1)
      filtering({router, page: page + 1})
  }
  // console.log(items);
  return (
    <div className="home_page">
      <Head>
        <title>The Nexus</title>
      </Head>  
      <div className="items">
      {
        items.length === 0 
        ? <h2>No items available</h2>
        : items.map(item =>(
          <HardwareItem key={item._id} item={item} />
        ))
      }
      </div>  

      {
        props.result < page * 4 ? ""
        : <button className="btn btn-outline-info d-block mx-auto mb-4"
        onClick={handleLoadMore}>
          Load More
        </button>
      }

    </div>
  )
}

export async function getServerSideProps({query}){
  const page = query.page || 1
  const category  = query.category || 'all'
  const sort  = query.sort || ''
  const search  = query.search || 'all'
  
  const res = await getData(`item?limit=${page * 4}&category=${category}&sort=${sort}&title=${search}`)
 
  //  console.log(res);
  return{
    props: {
      items: res.items,
      result: res.result 
    },  //will be passed to the page component as props
  }
}
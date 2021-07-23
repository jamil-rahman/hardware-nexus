import {getData} from '../utils/fetchData'

export default function Home() {
  return (
    <div>
        <title>Home Page</title>
      Home      
    </div>
  )
}

export async function getServerSideProps(context){
  const res = await getData('item')
  console.log(res);
  return{
    props: {},  //will be passed to the page component as props
  }
}
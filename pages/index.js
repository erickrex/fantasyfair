import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from 'react';
import DragNDrop from '../components/DragNDrop'
import Navbar from '../components/navbar'
import Link from 'next/link';

const defaultData = [
  {title: 'Winners', items: ['Adam_Cole', 'Aj_Styles', 'Andrade', 'Drew_McIntyre', 'Brock_Lesnar', 'Cesaro']},
  {title: 'Options', items: ['Randy_Orton', 'Roman_Reigns', 'Ricochet', 'Daniel_Bryan', 'Braun_Strowman' ]}
]


export default function Home() {
  const [data, setData] = useState();  
  useEffect(() => {
    if (localStorage.getItem('List')) {
      console.log(localStorage.getItem('List'))
      setData(JSON.parse(localStorage.getItem('List')))
    } else {
      setData(defaultData)
    }
  }, [setData])
  return (
    <div className="App">
      
      <header className="App-header">
      <DragNDrop data={data} />
      </header>
      
      <Link href="/Pagina">
        <a>Ver mas</a>
      </Link>
    </div>
  );
}

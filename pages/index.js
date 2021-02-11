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
  
  return (
    <div className="App">
      
      <header className="App-header">
      <DragNDrop data={defaultData} />
      </header>
      
      <Link href="/Pagina">
        <a>Ver mas</a>
      </Link>
    </div>
  );
}

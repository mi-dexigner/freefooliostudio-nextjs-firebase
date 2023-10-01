import Image from 'next/image'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import app from '@/firebase.Config';
import { useEffect, useState } from 'react';
import ProjectCardByUser from '@/components/ProjectCardByUser';

export default function Home() {

  const db=getFirestore(app)
  const [projects,setProjects]=useState([]);

  useEffect(()=>{
    getAllProjects();
  },[])
  const getAllProjects=async()=>{
    const q = query(collection(db, "projects"),
    orderBy("id","desc")
    );

  const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setProjects(projects=>[...projects,doc.data()]);
    });
  }
  return (
   <>
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
       <div className='p-5 items-baseline flex  flex-col'>
     <h2 className='text-[25px] mb-[-15px] text-left'>All Latest Projects</h2>

     {projects?
      <ProjectCardByUser userProject={projects} />:null}
     </div>

    </main>
   </>
  )
}

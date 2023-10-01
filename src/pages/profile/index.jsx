import UserCardInfo from '@/components/UserCardInfo'
import { useSession } from 'next-auth/react'
// import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import { query, collection, where, orderBy, getDocs,getFirestore } from 'firebase/firestore'; // Import Firebase Firestore modules

import ProjectCardByUser from '@/components/ProjectCardByUser';
import app from '@/firebase.Config';
import { useState,useEffect } from 'react';

const Profile = () => {
  const {data:session}=useSession();
    const db=getFirestore(app);
    const [userProject,setUserProject]=useState([]);
    
    useEffect(()=>{
        if(session)
        {
            setUserProject([]); 
            getUserProject();
        }
    },[session])
console.log(userProject)
    const getUserProject=async()=>{
        
        if(session)
        {
          setUserProject([]); 
           // 
            // const q=query(collection(db,'projects'),orderBy('id','desc'));
            // const q=query(collection(db,'projects'),
            // where('email','==',session.user.email),orderBy('id','desc'));
            // , orderBy('id', 'desc')
            const q = query(collection(db, 'projects'), where('email', '==', session.user.email),orderBy("id", "desc"));

            const querySnapshot =await getDocs(q);
            querySnapshot.forEach((doc) => {
                let data=doc.data()
                setUserProject(userProject=>
                    [...userProject,data]);
                
              });
        }
    }
  return (
    <div className='px-3 md:px-10'>
      <UserCardInfo />
      <ProjectCardByUser userProject={userProject} />
    </div>
  )
}

export default Profile
import React, { useEffect, useState } from 'react'
import {  getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Data from '@/data';
import Loader from './Loader';
// firebase
import { app } from '@/firebase.Config';
// import { getFirestore,doc, setDoc } from "firebase/firestore";
import { collection, addDoc,getFirestore } from 'firebase/firestore';


const CreateProjectForm = () => {
    const [inputs,setInputs]=useState({})
    const [techList,setTechList]=useState([]);
    const [file,setFile]=useState([]);
    const [submit,setSubmit]=useState(false);
    const [loader,setLoader]=useState(false);
    const [docId,setDocId]=useState(Date.now().toString());
    const {data:session}=useSession();

    const router=useRouter();

    //  db firestore set variable
    const db = getFirestore(app);
    // storage file
    const storage = getStorage(app);


    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
      
        setInputs((values)=>({
            ...values,[name]:value
        }))
    }
    // checkbox value get start
    const onTechSelect=(name,isChecked)=>{
        if(isChecked)
        {
            setTechList(techList=>
                [...techList,name]);
        }
        else{
            let techListItem=
            techList.filter(item=>item!==name)
                setTechList(techListItem);
        }
    }
    // checkbox value get end
    // save Docs start
const saveDoc = async ()=>{
    // Add a new document in collection "projects"
// await setDoc(doc(db, "projects", docId), inputs);
const collectionRef = collection(db, "projects"); // Reference to the "projects" collection
// Save data to the newly generated document
await addDoc(collectionRef, inputs);
setLoader(false);
router.push('/profile')
}
// save Docs end
    // submit form start
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoader(true)
        // console.table(inputs)
        // file get func on firebase
        const storageRef = ref(storage, 'projects/'+file?.name);
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            }).then(resp=>{
                getDownloadURL(storageRef).then((url)=>{
                    setInputs((values)=>({
                        ...values,image:url
                    }));
                setSubmit(true)
            })
        });
        

    }
    // submit form end

    useEffect(()=>{
      //  session value get start
      if(session)
      {
          setInputs((values)=>({
              ...values,userName:session.user?.name
          }));
          setInputs((values)=>({
              ...values,userImage:session.user?.image
          }));
          setInputs((values)=>({
              ...values,email:session.user?.email
          }))
          setInputs((values)=>({
              ...values,id:docId
          }))
         
      }
      //  session value get end
        setInputs((values)=>({
            ...values,['techList']:techList
        }))
        // save inputs data here
        if(submit==true)
        {
            saveDoc();
        }
        
    },[techList,submit,session])
  return (
    <div
    className="flex justify-center mt-10
  shadow-md mx-4 md:mx-56 lg:mx-72 p-5 rounded-md"
  >
    {loader?<div className='absolute'>
        <Loader/>
    </div>:null}
   <form onSubmit={handleSubmit}>
   <h2
        className="text-[30px]
    font-extrabold text-blue-500"
      >
        ADD PROJECT
      </h2>
      <h2 className="mb-6">Create New Project and Explore with Community</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        onChange={handleChange}
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <textarea
        name="desc"
        className="w-full mb-4 
      outline-blue-400 border-[1px] 
      p-2 rounded-md"
        required
        onChange={handleChange}
        placeholder="Write Description here"
      />
      {/* ss */}
      <h2 className="mb-3 font-bold">Select Technology</h2>
      <div className="grid grid-cols-2 mb-4 md:grid-cols-3  ">
        {Data.Technology.map((item,index) => (
          <div key={index} className="flex gap-2 items-center">
            <input id={`technology-${index}`}
            onClick={(e)=>onTechSelect(item.name,e.target.checked)}
             type="checkbox" 
             className="w-4 h-4" />
            <label htmlFor={`technology-${index}`}>{item.name}</label>
          </div>
        ))}
      </div>
      <input
        type="text"
        name="app-demo-url"
        placeholder="App Demo Url"
        onChange={handleChange}
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <input
        type="text"
        name="ui-ux-design-url"
        onChange={handleChange}
        placeholder="UI/UX Design Url(Figma)"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <input
        type="text"
        name="yt-url"
        onChange={handleChange}
        placeholder="Youtube Tutorial Url"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
      <input
        type="text"
        name="github-url"
        onChange={handleChange}
        placeholder="Github Source Code Url"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />

      <input
        type="text"
        onChange={handleChange}
        name="instagram"
        placeholder="Instagram Profile"
        className="w-full mb-4 border-[1px] p-2 rounded-md"
      />
        <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        />
       <button
        type="submit"
        className="bg-blue-500 w-full px-5 py-3 
rounded-md text-white w-1/5
"
      >
        Submit
      </button>
   </form>
  </div>
  )
}

export default CreateProjectForm
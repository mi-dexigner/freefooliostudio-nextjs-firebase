import React, { createContext, useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectDetailModels from './ProjectDetailModels'


export const SelectedProjectContext=
createContext();

const ProjectCardByUser = ({userProject}) => {
  const [showModal,setShowModal]=useState(false);
  const [project,setProject]=useState([]);

  const onProjectClick=(item)=>{
    setShowModal(true);
    setProject(item)
  }

  return (
    <div className='mt-10 mb-10'>
        {userProject.length > 0?
        <div className='columns-2 md:columns-3
        lg:columns-4 mx-auto space-y-3 lg:space-y-4 flex'>
          {userProject.map((item,index)=>(
            <div key={index} 
             onClick={()=>onProjectClick(item)}
            >
             <ProjectCard project={item} />
            </div>
          ))}
        </div>: <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md" role="alert">
         <div className="flex">
           <div className="py-1">
             <svg className="fill-current h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.293 10.293a1 1 0 0 1 1.414-1.414L10 15.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414z"/></svg>
           </div>
           <div>
             <p className="font-bold">Note</p>
             <p className="text-sm">You are no any Upload Project</p>
           </div>
         </div>
       </div>}
        <SelectedProjectContext.Provider value={{project,setProject}}>
      {showModal? <ProjectDetailModels setShowModal={(value)=>setShowModal(value)} />:null}
      </SelectedProjectContext.Provider>

    </div>
  )
}

export default ProjectCardByUser
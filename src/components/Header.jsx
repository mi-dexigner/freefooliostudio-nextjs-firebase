import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession()
    const user_image ='https://avatars.githubusercontent.com/u/7349178?v=4'
    console.log(session)
  return (
    <header className='flex justify-between p-4 border-b-[2px] border-blue-500'>
        
            <img src='./images/logo.png' className='w-[145px]' onClick={()=>router.push('/')} />
            <div className='flex'>
            {session?
            <button className='px-3 p-2 bg-black rounded-full text-white mr-2'  onClick={()=>router.push('/create-project')}>
                <span className='sm:block'>Create Post</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:hidden">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
 </button>:null}
 {!session?<button className='px-3 p-2 bg-gray-200 rounded-full text-gray-700' onClick={()=>signIn()}>Sign In</button>:
         <button className='px-3 p-2 bg-gray-200 rounded-full text-gray-700 mr-2' onClick={()=>signOut()}>Sign Out</button>}
  {session?<Image src={session.user.image}  onClick={()=>router.push('/profile')} className="rounded-full cursor-pointer" alt={session.user.name} width={40} height={40} />:null}
        </div>
    </header>
  )
}

export default Header
import Image from 'next/image'

const Loader = () => {
  return (
    <div className='w-full p-32 mt-[30%]
    backdrop-blur-sm h-[400px] z-10'>
       <Image src='/images/loader.png' width={80} height={80} 
       alt='Loader'
       className='w-[80px] animate-spin' />
    </div>
  )
}

export default Loader
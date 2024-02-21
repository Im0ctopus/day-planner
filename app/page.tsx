import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { Button } from '@/components/ui/button'
import MainLoginBtn from '@/components/mainloginbtn'
import Features from './features'

const Page = async () => {
  const session = await getServerSession()
  return (
    <div className="flex flex-col gap-10 justify-center items-center max-w-1080px mx-auto px-4 md:mx-0 mt-14 pb-32">
      <h1 className="font-bold text-5xl lg:text-8xl italic">DAY PLANNER</h1>
      <div className="flex flex-row justify-center items-center gap-0">
        <Image
          src="/2.png"
          width={400}
          height={500}
          alt="Home exaple 2"
          className="shadow-md shadow-black lg:w-[400px] w-40 select-none"
        />
        <Image
          src="/1.png"
          width={750}
          height={750}
          alt="Home exaple 1"
          className="shadow-md shadow-black w-60 lg:w-[750px] select-none"
        />
      </div>
      {!session ? (
        <MainLoginBtn />
      ) : (
        <Link href={'/calendar'}>
          <Button className="bg-blue-600 hover:bg-blue-600/80 text-white font-light text-xl">
            Get In
          </Button>
        </Link>
      )}
      <Features />
    </div>
  )
}
export default Page

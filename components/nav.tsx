'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'
import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { ModeToggle } from './theme-toggle'

const Nav = () => {
  const { data: session } = useSession()
  const [up, setUp] = useState<boolean>(false)

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    if (scrollPosition >= 100) setUp(true)
    else setUp(false)
  }
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {!session || !session?.user ? (
        <nav className="flex flex-row justify-end px-2 lg:px-10 items-center h-20 backdrop-blur-sm bg-black/20 gap-2">
          <Button variant={'secondary'} onClick={() => signIn('google')}>
            Sign In
          </Button>
          <ModeToggle />
        </nav>
      ) : (
        <nav
          id="nav"
          className="flex flex-row justify-between px-2 lg:px-10 items-center h-20 backdrop-blur-sm bg-black/20"
        >
          <div className="flex flex-row gap-3 justify-center items-center">
            <Avatar>
              <AvatarImage src={session?.user?.image ?? ''} />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
            <p>{session?.user?.name}</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <Button variant={'secondary'} onClick={() => signOut()}>
              Sign Out
            </Button>
            <ModeToggle />
          </div>
        </nav>
      )}
      <Button
        onClick={() => window.scrollTo(0, 0)}
        variant={'secondary'}
        size={'icon'}
        className={`rounded-full z-50 opacity-50 fixed bottom-10 inset-x-0 mx-auto transition-all duration-300 ease-in-out ${
          !up ? 'translate-y-20' : 'translate-y-0'
        }`}
      >
        <ChevronUp />
      </Button>
    </>
  )
}
export default Nav

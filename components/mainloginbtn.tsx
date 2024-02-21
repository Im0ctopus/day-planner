'use client'

import { signIn } from 'next-auth/react'
import { Button } from './ui/button'

const MainLoginBtn = () => {
  return (
    <Button
      className="bg-blue-600 hover:bg-blue-600/80 text-white font-light text-xl"
      onClick={() => signIn('google')}
    >
      Log In
    </Button>
  )
}
export default MainLoginBtn

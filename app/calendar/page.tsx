import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Calendar from './calendar'
import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendar | Day Planner',
}

const Page = async () => {
  const session = await getServerSession()
  if (!session || !session.user) redirect('/')
  return (
    <div className="mt-10 w-full max-w-[1080px] mx-auto px-2 l-10">
      <Calendar />
    </div>
  )
}
export default Page

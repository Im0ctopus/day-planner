'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Form from './form'
import Month from './month'
import { handleGetTasks } from '@/db/queris'
import { useSession } from 'next-auth/react'
import Year from './year'
import Day from './day'

type TCalendar = 'day' | 'month' | 'year'

type TTasks = {
  title: string
  desc: string
  date: string
  start: string
  end: string
  email: string
  color: number
}

const Loading = () => (
  <div className="w-full flex justify-center items-center min-h-52">
    <Loader2 className="animate-spin" size={50} />
  </div>
)

const Calendar = () => {
  const session = useSession()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [calendar, setCalendar] = useState<TCalendar>('month')
  const [tasks, setTasks] = useState<TTasks[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth())

  const getTasks = async () => {
    const temp: any = await handleGetTasks(session.data?.user?.email!)
    setTasks(temp!)
    setLoading(false)
    console.log(temp)
  }

  useEffect(() => {
    if (session.data?.user?.email) {
      getTasks()
    }
  }, [session.data?.user?.email])

  return (
    <motion.div
      layout
      className="flex flex-col gap-2 justify-center items-center"
    >
      <motion.div
        layout
        className="flex flex-col gap-2 justify-center items-start w-full "
      >
        <motion.div layout className="flex justify-between items-center w-full">
          <Button onClick={() => setIsOpen(!isOpen)}>New Task</Button>
          <select
            className="flex h-10 w-fit rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={calendar}
            onChange={(e) => setCalendar(e.target.value as TCalendar)}
          >
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </motion.div>
        {isOpen && <Form getTasks={getTasks} setIsOpen={setIsOpen} />}
      </motion.div>
      <motion.div layout className="w-full">
        {loading ? (
          <Loading />
        ) : (
          <motion.div layout>
            {calendar == 'day' && (
              <Day
                tasks={tasks}
                setTasks={setTasks}
                getTasks={getTasks}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                setCalendar={setCalendar}
              />
            )}
            {calendar == 'month' && (
              <Month
                tasks={tasks}
                setTasks={setTasks}
                getTasks={getTasks}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                setCalendar={setCalendar}
              />
            )}
            {calendar == 'year' && (
              <Year
                tasks={tasks}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                setCalendar={setCalendar}
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
export default Calendar

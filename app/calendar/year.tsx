import { Dispatch, FC, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type TTasks = {
  title: string
  desc: string
  date: string
  start: string
  end: string
  email: string
  color: number
}

let possibleColors = [
  'bg-red-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-gray-600',
  'bg-purple-600',
]

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type TCalendar = 'day' | 'month' | 'year'

type TYear = {
  tasks: TTasks[]
  setMonth: Dispatch<SetStateAction<number>>
  year: number
  setYear: Dispatch<SetStateAction<number>>
  setCalendar: Dispatch<SetStateAction<TCalendar>>
}
const Year: FC<TYear> = ({ tasks, setMonth, setYear, year, setCalendar }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-10 flex flex-col justify-center items-center gap-10"
    >
      <div className="flex justify-center items-center gap-1">
        <Button
          onClick={() => setYear(year - 1)}
          className="w-8 h-8"
          size={'icon'}
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-xl font-semibold uppercase w-32 text-center">
          {year}
        </h1>
        <Button
          onClick={() => setYear(year + 1)}
          className="w-8 h-8"
          size={'icon'}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="relative w-full">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: 'linear', delay: 0.2 },
            }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'linear' }}
            key={year}
            className="w-full grid grid-cols-3 lg:grid-cols-6 absolute"
          >
            {months.map((month, index) => (
              <div
                key={index}
                onClick={() => {
                  setMonth(index)
                  setCalendar('month')
                }}
                className="w-full cursor-pointer aspect-square border flex flex-col justify-start items-center"
              >
                <p className="w-full flex justify-end items-center px-3 py-1">
                  {month}
                </p>
                <div className="flex-wrap gap-1 p-2 w-full justify-end items-end flex">
                  {tasks?.map((task: any) => {
                    const tMonth = new Date(task.taskdate).getMonth()
                    const tYear = new Date(task.taskdate).getFullYear()
                    if (tMonth == index && tYear == year)
                      return (
                        <div
                          className={`rounded-full h-3 w-3 bg-${task.colorname.toLowerCase()}-600`}
                        ></div>
                      )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
export default Year

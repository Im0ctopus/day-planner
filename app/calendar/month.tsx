import { handleDelTask } from '@/db/queris'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

type TTasks = {
  title: string
  desc: string
  date: string
  start: string
  end: string
  email: string
  color: number
}

type TCalendar = 'day' | 'month' | 'year'

let possibleColors = [
  'bg-red-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-gray-600',
  'bg-purple-600',
]

type TMonth = {
  tasks: TTasks[]
  setTasks: Dispatch<SetStateAction<TTasks[]>>
  getTasks: () => Promise<void>
  month: number
  setMonth: Dispatch<SetStateAction<number>>
  year: number
  setYear: Dispatch<SetStateAction<number>>
  setCalendar: Dispatch<SetStateAction<TCalendar>>
}

const Month: FC<TMonth> = ({
  tasks,
  setTasks,
  getTasks,
  month,
  setMonth,
  year,
  setYear,
  setCalendar,
}) => {
  function getDaysInMonth() {
    const days = new Date(year, month + 1, 0).getDate()
    return days
  }

  function getMonthName() {
    const months = [
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

    return months[month]
  }

  const delTask = async (id: number) => {
    handleDelTask(id)
    await getTasks()
    toast('Task removed')
  }

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
          disabled={month == 0}
          onClick={() => setMonth(month - 1)}
          className="w-8 h-8"
          size={'icon'}
        >
          <ChevronLeft />
        </Button>
        <h1
          onClick={() => setCalendar('year')}
          className="text-xl cursor-pointer font-semibold uppercase w-52 text-center"
        >
          {getMonthName() + ' ' + year}
        </h1>
        <Button
          disabled={month == 11}
          onClick={() => setMonth(month + 1)}
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
            key={month}
            className="w-full grid grid-cols-4 lg:grid-cols-7 absolute"
          >
            {Array(getDaysInMonth())
              .fill('')
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full aspect-square border flex flex-col justify-start items-center"
                >
                  <p className="w-full flex justify-end items-center px-3 py-1">
                    {index + 1}
                  </p>
                  <div className="flex-1 flex-grow h-full w-full justify-center items-center flex-col flex gap-1">
                    {tasks?.map((task: any) => {
                      const day = new Date(task.taskdate).getDate()
                      const tMonth = new Date(task.taskdate).getMonth()
                      const tYear = new Date(task.taskdate).getFullYear()
                      if (day == index + 1 && tMonth == month && tYear == year)
                        return (
                          <Dialog>
                            <DialogTrigger
                              className={`flex-1 w-full flex-grow h-full overflow-clip transition-all hover:scale-105`}
                            >
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'linear' }}
                                className={`flex-1 flex-grow h-full bg-${task.colorname.toLowerCase()}-600 cursor-pointer flex justify-center items-center rounded-sm`}
                              >
                                <p className="font-semibold text-xs px-2 py-1 w-full overflow-hidden text-ellipsis text-white">
                                  {task.title}
                                </p>
                              </motion.div>
                            </DialogTrigger>
                            <DialogContent
                              className={`bg-${task.colorname.toLowerCase()}-600 text-white`}
                            >
                              <DialogHeader>
                                <DialogTitle>{task.title}</DialogTitle>
                                <DialogDescription className="pt-3">
                                  <div className="grid md:grid-cols-3 items-center gap-3">
                                    <div className="w-full col-span-1 flex justify-center items-center gap-2">
                                      <Label
                                        className="opacity-100 text-white"
                                        htmlFor="day"
                                      >
                                        Task day:
                                      </Label>
                                      <p className="font-thin">
                                        {day}-{tMonth}-{tYear}
                                      </p>
                                    </div>
                                    <div className="w-full col-span-1 flex justify-center items-center gap-2">
                                      <Label
                                        className="opacity-100 text-white"
                                        htmlFor="day"
                                      >
                                        Start :
                                      </Label>
                                      <p className="font-thin">
                                        {task.starttime}
                                      </p>
                                    </div>
                                    <div className="w-full col-span-1 flex justify-center items-center gap-2">
                                      <Label
                                        className="opacity-100 text-white"
                                        htmlFor="day"
                                      >
                                        End :
                                      </Label>
                                      <p className="font-thin">
                                        {task.endtime}
                                      </p>
                                    </div>
                                    <div className="w-full lg:col-span-3 flex flex-col justify-center items-start gap-2">
                                      <Label
                                        className="opacity-100 text-white"
                                        htmlFor="day"
                                      >
                                        Description :
                                      </Label>
                                      <p className="font-thin">
                                        {task.description}
                                      </p>
                                    </div>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose>
                                  <Button
                                    onClick={() => delTask(task.id)}
                                    variant={'destructive'}
                                  >
                                    Remove task
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
export default Month

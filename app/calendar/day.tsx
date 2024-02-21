import { Dispatch, FC, SetStateAction, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import { handleDelTask } from '@/db/queris'
import { toast } from 'sonner'

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

let possibleClasses = [
  'bg-red-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-gray-600',
  'bg-purple-600',
  'row-start-[0]',
  'row-start-[1]',
  'row-start-[2]',
  'row-start-[3]',
  'row-start-[4]',
  'row-start-[5]',
  'row-start-[6]',
  'row-start-[7]',
  'row-start-[8]',
  'row-start-[9]',
  'row-start-[10]',
  'row-start-[11]',
  'row-start-[12]',
  'row-start-[13]',
  'row-start-[14]',
  'row-start-[16]',
  'row-start-[17]',
  'row-start-[18]',
  'row-start-[19]',
  'row-start-[20]',
  'row-start-[21]',
  'row-start-[22]',
  'row-start-[23]',
  'row-start-[24]',
  'row-end-[1]',
  'row-end-[2]',
  'row-end-[3]',
  'row-end-[4]',
  'row-end-[5]',
  'row-end-[6]',
  'row-end-[7]',
  'row-end-[8]',
  'row-end-[9]',
  'row-end-[10]',
  'row-end-[11]',
  'row-end-[12]',
  'row-end-[13]',
  'row-end-[14]',
  'row-end-[15]',
  'row-end-[16]',
  'row-end-[17]',
  'row-end-[18]',
  'row-end-[19]',
  'row-end-[20]',
  'row-end-[21]',
  'row-end-[22]',
  'row-end-[23]',
  'row-end-[24]',
]

type TDay = {
  tasks: TTasks[]
  setTasks: Dispatch<SetStateAction<TTasks[]>>
  getTasks: () => Promise<void>
  month: number
  setMonth: Dispatch<SetStateAction<number>>
  year: number
  setYear: Dispatch<SetStateAction<number>>
  setCalendar: Dispatch<SetStateAction<TCalendar>>
}

const Day: FC<TDay> = ({
  tasks,
  setTasks,
  getTasks,
  month,
  setMonth,
  year,
  setYear,
  setCalendar,
}) => {
  const [day, setDay] = useState<number>(new Date().getDate())

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

  function getDaysInMonth() {
    const days = new Date(year, month + 1, 0).getDate()
    return days
  }

  const handleDayChange = (number: number) => {
    const monthDays = getDaysInMonth()
    if (day + number > monthDays) {
      if (month + 1 > 11) {
        setYear(year + 1)
        setMonth(1)
        setDay(1)
        return
      } else {
        setMonth(month + 1)
        setDay(1)
        return
      }
    }
    if (day + number < 1) {
      if (month - 1 < 0) {
        setYear(year - 1)
        setMonth(11)
        setDay(31)
        return
      } else {
        setMonth(month - 1)
        setDay(new Date(year, month, 0).getDate())
        return
      }
    } else {
      setDay(day + number)
    }
  }
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full relative pl-14"
    >
      <div>
        <div className="flex justify-center items-center gap-1 mb-10 mt-3">
          <Button
            onClick={() => handleDayChange(-1)}
            className="w-8 h-8"
            size={'icon'}
          >
            <ChevronLeft />
          </Button>
          <h1
            onClick={() => setCalendar('month')}
            className="text-xl cursor-pointer font-semibold uppercase w-48 text-center"
          >
            {day + ' ' + getMonthName() + ' ' + year}
          </h1>
          <Button
            onClick={() => handleDayChange(1)}
            className="w-8 h-8"
            size={'icon'}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
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
          key={day}
          className="grid z-10 grid-rows-24 grid-flow-col border-2 divide-y-2 w-full absolute left-0"
        >
          {Array(24)
            .fill('')
            .map((_, index) => (
              <div
                key={index}
                className="w-full row-span-1 h-14 flex-1 flex-grow flex justify-start items-center"
              >
                <p className="border-r-2 p-2 h-full flex justify-center items-center">
                  {index.toString().padStart(2, '0')}:00
                </p>
              </div>
            ))}
        </motion.div>
      </AnimatePresence>
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
          key={day}
          className="grid grid-rows-24 grid-flow-col border-2 z-20 absolute left-14 right-0"
        >
          {tasks?.map((task: any) => {
            const tDay = new Date(task.taskdate).getDate()
            const tMonth = new Date(task.taskdate).getMonth()
            const tYear = new Date(task.taskdate).getFullYear()
            const start = task.starttime.substring(0, 2)
            const end = task.endtime.substring(0, 2)
            if (tDay == day && tMonth == month && tYear == year)
              return (
                <Dialog>
                  <DialogTrigger
                    className={`flex-1 cursor-pointer rounded-sm w-full overflow-clip transition-all z-10 hover:z-20 hover:scale-[1.01] bg-${task.colorname.toLowerCase()}-600 row-start-[${
                      parseInt(start) + 1
                    }] row-end-[${parseInt(end) + 1}]`}
                  >
                    <div className={`w-full flex justify-center items-center `}>
                      <p className="text-lg font-semibold text-white">
                        {task.title}
                      </p>
                    </div>
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
                            <p className="font-thin">{task.starttime}</p>
                          </div>
                          <div className="w-full col-span-1 flex justify-center items-center gap-2">
                            <Label
                              className="opacity-100 text-white"
                              htmlFor="day"
                            >
                              End :
                            </Label>
                            <p className="font-thin">{task.endtime}</p>
                          </div>
                          <div className="w-full lg:col-span-3 flex flex-col justify-center items-start gap-2">
                            <Label
                              className="opacity-100 text-white"
                              htmlFor="day"
                            >
                              Description :
                            </Label>
                            <p className="font-thin">{task.description}</p>
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
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
export default Day

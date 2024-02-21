import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { handleCreateTask, handleGetColors } from '@/db/queris'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

type TColor = {
  id: number
  colorname: string
}

type TForm = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  getTasks: () => Promise<void>
}

const Form: FC<TForm> = ({ setIsOpen, getTasks }) => {
  const session = useSession()

  const [loading, setLoading] = useState<boolean>(false)
  const [colors, setColors] = useState<TColor[]>([])
  const [selectedColor, setSelectedColor] = useState<number>(1)
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [date, setDate] = useState<any>(getDate)
  const [start, setStart] = useState<any>(getTime)
  const [end, setEnd] = useState<any>(getTime)

  function getDate() {
    const today = new Date()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const date = ('0' + today.getDate()).slice(-2)
    const year = today.getFullYear()
    return `${year}-${month}-${date}`
  }

  function getTime(): string {
    const now = new Date()

    let hours: string = now.getHours().toString() // Ensure string
    if (hours.length === 1) {
      // Check length for string-based zero-padding
      hours = '0' + hours
    }

    let minutes: string = now.getMinutes().toString()
    if (minutes.length === 1) {
      minutes = '0' + minutes
    }

    return `${hours}:${minutes}`
  }

  const getColors = async () => {
    setLoading(true)
    setColors(await handleGetColors())
    setLoading(false)
  }

  useEffect(() => {
    getColors()
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCreateTask(
      title,
      desc,
      date,
      start,
      end,
      session.data?.user?.email!,
      selectedColor
    )
    setIsOpen(false)
    getTasks()
    toast('New task has been created!')
  }

  useEffect(() => {}, [date, start, end])

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full max-w-[504px] mx-auto justify-center items-center gap-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <>
        <div className="flex justify-center items-center w-full gap-2">
          <div className="w-8/12">
            <Label htmlFor="title">Task title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="w-full"
            />
          </div>
          <div className="w-4/12">
            <Label htmlFor="color">Task color</Label>
            {loading ? (
              <div className="flex justify-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <select
                id="color"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedColor}
                onChange={(e) => setSelectedColor(parseInt(e.target.value))}
              >
                {colors.map((color: TColor) => (
                  <option key={color.id} value={color.id}>
                    {color.colorname}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="items-center w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="col-span-1">
            <Label htmlFor="date">Task day</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="start">Start time</Label>
            <Input
              type="time"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="end">End time</Label>
            <Input
              type="time"
              id="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>

        <Textarea
          placeholder="Type the task description here"
          className="resize-none"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="w-full flex justify-between items-center">
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          {loading ? (
            <Button disabled type="submit">
              Create
            </Button>
          ) : (
            <Button type="submit">Create</Button>
          )}
        </div>
      </>
    </motion.form>
  )
}
export default Form

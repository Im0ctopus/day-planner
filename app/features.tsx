import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

let features: string[] = [
  'Multi-View Calendar',
  'Color-Coded Tasks',
  'Task Times',
  'Beautiful, User-Friendly Design',
]
let descriptions: string[] = [
  " Users need flexibility to see what's immediate (day), get a wider context (month) and make long-term plans (year).",
  'Instant visual organization. Let people assign colors to project types, priorities, or whatever system works for them.',
  'Essential for preventing schedules from becoming overwhelming. Help users allocate specific time blocks for tasks.',
  'Pleasant to look at and intuitive to navigate. First impressions count!',
]

const Features = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full max-w-[1080px]">
      <h2 className="font-bold text-6xl italic bg-gradient-to-tr from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Features
      </h2>
      <Accordion
        type="multiple"
        className="w-full grid md:grid-cols-2 gap-10 items-center font-light text-lg"
      >
        {features.map((fea, index) => (
          <AccordionItem
            key={index}
            value={index.toString()}
            className="col-span-1"
          >
            <AccordionTrigger>{fea}</AccordionTrigger>
            <AccordionContent>{descriptions[index]}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
export default Features

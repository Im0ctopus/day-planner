'use server'

import postgres from 'postgres'

type TColor = {
  id: number
  colorname: string
}

type TTasks = {
  title: string
  desc: string
  date: string
  start: string
  end: string
  email: string
  color: number
}

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'allow',
})

export const handleCreateTask = async (
  title: string,
  desc: string,
  date: string,
  start: string,
  end: string,
  email: string,
  color: number
) => {
  await sql`
    INSERT INTO Tasks (Title, Description, TaskDate, StartTime, EndTime, Email, ColorId)
    VALUES (${title}, ${desc}, ${date}, ${start}, ${end}, ${email}, ${color});
  `
}

export const handleGetColors = async () => {
  const colors: TColor[] = await sql`SELECT * FROM public.colors`
  return colors
}

export const handleGetTasks = async (email: string) => {
  const userTasks: TTasks[] = await sql`SELECT Tasks.*, colors.colorname 
FROM Tasks 
JOIN colors ON Tasks.colorId = colors.id
WHERE Tasks.Email = ${email};
`
  return userTasks
}

export const handleDelTask = async (id: number) => {
  await sql`DELETE FROM tasks
WHERE id = ${id};
`
}

export async function DemoCall()
{
  const res = await fetch('/api/admin')
  const data = await res.json()
  console.log(data)
  return res
}
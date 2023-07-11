export default function Footer(props)
{
  const {message} = {...props}
  return (
    <>
      <div className={`text-center p-6 bg-blue-700 text-green-500`}>
        {message}
      </div>
    </>
      )
}
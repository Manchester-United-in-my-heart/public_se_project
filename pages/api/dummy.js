export default function (req, res)
{
  res.status(200).json(
    {
      mess: process.env.BASE_URL
    }
  )
}
export default function (req, res) {
  res.status(200).json(
    {
      mess: process.env.DB_USER
    }
  )
}
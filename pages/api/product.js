import {MongoClient, ObjectId} from "mongodb";

export default async function (req, res){
  if (req.method === 'GET')
  {
    const productId = req.query.productId

    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('productpool')

    const result = await collection.findOne({_id:new ObjectId(productId)})

    await client.close()

    res.status(200).json(
      {
        product: result,
      }
      )
  }
  else if (req.method === 'POST')
  {
    console.log(req.body)
    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('productpool')

    await collection.insertOne(req.body)

    await client.close()

    res.status(200).json(
      {
        mess: 'test'
      }
    )
  }
  else if (req.method === 'PUT')
  {
    console.log(req.body)
    console.log(req.query)

    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('productpool')

    const jsonBody = JSON.parse(req.body)

    await collection.updateOne({_id:new ObjectId(req.query.productId)}, {$set: jsonBody })

    await client.close()

    res.status(200).json(
      {
        mess: 'test'
      }
    )
  }
}
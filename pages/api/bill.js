import {MongoClient} from "mongodb";

export default async function (req, res) {
  if (req.method === 'GET')
  {
    const shopId = req.query.shopId

    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('billpool')

    const bills = await collection.find({shopId: shopId}).toArray()

    await client.close()

    res.status(200).json(
      {
        bills: bills
      }
    )
  } else if (req.method === 'POST') {
    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('billpool')

    const resBody = JSON.parse(req.body)

    await collection.insertOne(resBody)

    await client.close()

    res.status(200).json(
      {
        mess: 'test'
      }
    )
  }
}
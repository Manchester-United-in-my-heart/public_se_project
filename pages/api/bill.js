import {MongoClient, ObjectId} from "mongodb";

export default async function (req, res) {
  if (req.method === 'GET')
  {
    const shopId = req.query.shopId

    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority`)

    const db = client.db()

    const collection = db.collection('billpool')

    const bills = await collection.find({shopId: shopId}).toArray()

    const sortedBills = bills.sort((a, b) => {
      return new Date(b.dateCreate) - new Date(a.dateCreate)
    })

    await client.close()

    res.status(200).json(
      {
        bills: sortedBills
      }
    )
  } else if (req.method === 'POST') {

    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority`)

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
  } else if (req.method === 'PATCH')
  {
    const billId = req.query.billId


    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority`)

    const db = client.db()

    const collection = db.collection('billpool')

    await collection.updateOne({_id: new ObjectId(billId)}, {$set: {isFulfilled: true}})

    await client.close()

    res.status(200).json(
      {
        mess: 'test'
      }
    )
  }
}
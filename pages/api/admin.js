import {MongoClient, ObjectId} from "mongodb";

export default async function (req, res) {
  if (req.method === 'POST') {
    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('shop')

    await collection.insertOne({name: req.body.name, email: req.body.email})

    await client.close()
    res.status(200).json(
      {
        mess: 'Delete successfully',
      }
    )
  }
  else if (req.method === 'DELETE') {
    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('shop')

    await collection.deleteOne({_id: new ObjectId(req.query.id)})

    await client.close()
    res.status(200).json(
      {
        mess: 'Delete successfully',
      }
    )
  }
  else if (req.method === 'PUT') {

    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('shop')

    await collection.updateOne({_id: new ObjectId(req.body.id)}, {$set: {name: req.body.name, email: req.body.email}})

    await client.close()
    res.status(200).json(
      {
        mess: 'Update successfully',
      }
    )
  }
  else {
    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')
    const db = client.db()

    const collection = db.collection('shop')

    const data = await collection.find().toArray()

    await client.close()
    res.status(200).json(
      {
        list_shop: [...data]
      }
    )
  }
}
import {MongoClient} from "mongodb";

export default async function (req, res) {

    const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

    const db = client.db()

    const collection = db.collection('cartpool')

    if (req.method === 'GET')
    {
      const cartId = req.query.cartId

      const result = await collection.findOne({cartId: cartId})

      res.status(200).json(
        {
          cart: result
        }
      )
    }

    if (req.method === 'PATCH'){

      const cartId = req.query.cartId

      const resBody = JSON.parse(req.body)

      await collection.updateOne({cartId: cartId}, {$set: resBody})

      res.status(200).json(
        {
          mess: 'test'
        }
      )
    }
    await client.close()
}
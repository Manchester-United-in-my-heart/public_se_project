import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github"
import {MongoClient} from "mongodb";
import Credentials from "next-auth/providers/credentials"


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "115603208302-cb53ptse6k34vaf4lpgtfmjfvqdfr96e.apps.googleusercontent.com",
      clientSecret: "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"
    }),
    Credentials(
      {
        name: "Credential",
        async authorize(credentials, req){

          let result = undefined

          const client = await MongoClient.connect('mongodb+srv://khambui2003:Emtraitoi123@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority')

          const db = client.db()

          if (credentials.role === "admin")
          {
            const collection = db.collection('admin')
            const foundItem =await collection.findOne({email: credentials.email, password: credentials.password})
            if (foundItem)
            {
              result = {...foundItem, role: "admin"}
            }
            else {
              throw new Error("Can't find admin account")
            }
          } else if (credentials.role === "shop")
          {
            const collection = db.collection('shop')
            const foundItem =await collection.findOne({email: credentials.email, password: credentials.password})
            if (foundItem)
            {
              result = {...foundItem, role: "shop"}
            }
            else {
              throw new Error("Can't find shop account")
            }
          } else if (credentials.role === "customer")
          {
            const collection = db.collection('customer')
            const foundItem =await collection.findOne({email: credentials.email, password: credentials.password})
            if (foundItem)
            {
              result = {...foundItem, role: "customer"}
            }
            else {
              throw new Error("Can't find customer account")
            }
          }
          await client.close()

          return result
        }
      }
    )
  ],
  callbacks : {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.user = user
      }
      return token;
    },

    async session ({session, token})
    {
      session.dispatchToken = token
      return session
    }
  }
})
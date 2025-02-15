import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("your_database_name")
    
    // Example query
    const users = await db.collection("users").find({}).limit(10).toArray()
    
    return Response.json({ users })
  } catch (e) {
    console.error(e)
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
} 
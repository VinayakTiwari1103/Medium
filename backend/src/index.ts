import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



// Create the main Hono app ,, we can also use @ts-ignore 
const app = new Hono<{ // Define the type of the context
  Bindings: {
    DATABASE_URL: string
  }
}>();


app.post('/api/v1/signup', async(c) => {
  // this c variable is the context of the request
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,// TO REMOVE THE DATABASE_URL ISSUE WE NEED TO USE BINDING IN HONO
  }).$extends(withAccelerate())

  const body = await c.req.json();

  await prisma.user.create({
    data: {
      email: c.body.email,
      password: c.body.password,
    }, 
  })
  return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
  return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id);
  return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

  return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
  return c.text('signin route')
})

export default app;

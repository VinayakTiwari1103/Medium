import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'crypto';
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import { userRouter } from './user';
import { bookRouter } from './blog';
// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", bookRouter);

export default app;


//WE HAVE CREATED DIFFERNE TFILES FOR THE BELOW ROUTES



// app.use('/api/v1/blog/*', async (c, next) => {
//     // Get the Authorization header
//     const header = c.req.header('Authorization');
// 	//bearer toke = [""Bearer", "token"]
// 	const token = header?.split(" ")[1]

//     // Check if header exists
//     if (!header) {
//         return c.status(403).json({ error: 'Unauthorized: No token provided' });
//     }
//     // Verify the token
//     const response = await verify(header, c.env.JWT_SECRET);
//     if (response && response.id) {
//         // Proceed to next middleware/handler
//         await next();
//     } else {
//         // Return 403 if token is invalid
//         return c.status(403).json({ error: 'Unauthorized' });
//     }
// });


// app.post('/api/v1/signup', async (c) => {
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	try {
// 		const user = await prisma.user.create({
// 			data: {
// 				email: body.email,
// 				password: body.password
// 			}
// 		});
// 		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
// 		return c.json({ jwt });
// 	} catch(e) {
// 		c.status(403);
// 		return c.json({ error: "error while signing up" });
// 	}
// })


// app.post('/api/v1/signin', async (c) => {
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	const user = await prisma.user.findUnique({
// 		where: {
// 			email: body.email,
// 			password: body.password
// 		}
// 	});

// 	if (!user) {
// 		c.status(403);
// 		return c.json({ error: "user not found" });
// 	}

// 	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
// 	return c.json({ jwt });
// })


// app.get('/api/v1/blog/:id', (c) => {
//   const id = c.req.param('id')
//   console.log(id);
//   return c.text('get blog route')
// })

// app.post('/api/v1/blog', (c) => {
	

//   return c.text('signin route')
// })

// app.put('/api/v1/blog', (c) => {
//   return c.text('signin route')
// })

// export default app;

import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import xss from 'xss-clean'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()
const app = express()
// connectDB
import connectDB from './db/connectDb.js'

// import routes 

import authRouter from './routes/AuthRoute.js'
import categoryRouter from './routes/CategoryRoute.js'
import productsRouter from './routes/ProductsRoute.js'
import reviewRouter from './routes/ReviewRoute.js'
import orderRouter from './routes/OrderRoute.js'
import clientRouter from './routes/ClientRoute.js'
// import midlewares 

import notFoundMiddleware from './middleware/notFoundMiddleware.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'





app.get('/api/v1', (req, res) => {
    res.json({ msg: 'welcome to my mern project' })
})
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))


app.use(express.json({ limit: '20mb' }))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            scriptSrc: ["'self'", 'data:', 'js.stripe.com', 'https://accounts.google.com'],
            imgSrc: ["'self'", 'data:', 'res.cloudinary.com'],
            frameSrc: ["'self'", "https://js.stripe.com"],
            connectSrc: ["'self'", 'data:', 'https://www.googleapis.com/']
        },
    })
);
app.use(xss())
app.use(ExpressMongoSanitize())



// routes 

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/', clientRouter)

// middlewares 


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.port || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log('the app is listening on port : ' + port);
        })
    } catch (error) {
        console.log(error);
    }
}


start()

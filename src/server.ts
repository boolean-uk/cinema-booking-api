import express from 'express'
const app = express()

import cors from 'cors'
import morgan from 'morgan'

app.disable('x-powered-by')

// Add middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Tell express to use your routers here
import customerRouter from './routers/customer'
app.use('/customers', customerRouter)

import moviesRouter from './routers/movies'
app.use('/movies', moviesRouter)

export default app

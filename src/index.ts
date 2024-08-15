import dotenv from 'dotenv'
import app from './server'
const port = process.env.PORT || 4040

dotenv.config()

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`)
})

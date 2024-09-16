const { createScreenDb, createScreenAndScreeningsDb, getScreenByNum } = require('../domains/screen.js')

// CREATE A SCREEN
const createScreen = async (req, res) => {
    const { number, screenings } = req.body

    if (!number) 
    return res.status(400).json({error: "Missing fields in the request body, please enter a screen number."})

    const duplicateScreen = await getScreenByNum(number)
    if (duplicateScreen)
    return res.status(409).json({ error: "A screen with the provided number already exists" })

    if (screenings) {
        const screenAndScreenings = await createScreenAndScreeningsDb(number, screenings)
        return res.status(201).json({ screen: screenAndScreenings })
    }

    const newScreen = await createScreenDb(number)
    return res.status(201).json({ screen: newScreen })
}

module.exports = { createScreen }

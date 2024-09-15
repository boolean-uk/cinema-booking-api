const {
    createScreenDb
} = require('../domains/screens')

const createScreen = async (req, res) => {
    const { number } = req.body

    console.log(req.body)

    if (!number) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    try {
        const createdScreen = await createScreenDb(number)

        res.status(201).json({ screen: createdScreen })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    createScreen
}
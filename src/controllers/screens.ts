import * as db from '../domains/screens'
import { Response, Request } from 'express'

export const createScreen = async (req: Request, res: Response) => {
    const { number } = req.body

    try {
        const screen = await db.createScreen(number)

        res.status(201).json({ screen: screen })
    } catch (e: any) {
        res.status(500).json({ error: e.message })
        console.log(e.message)
    }
}

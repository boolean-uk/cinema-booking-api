import * as db from '../domains/movies'
import { Response, Request } from 'express'

export const getAllMovies = async (req: Request, res: Response) => {
    const { runtimeGt } = req.query.runtimeGt as unknown as {
        runtimeGt: number
    }
    const { runtimeLt } = req.query.runtimeLt as unknown as {
        runtimeLt: number
    }

    try {
        const movies = await db.getAllMovies(runtimeGt, runtimeLt)

        res.status(200).json({ movies: movies })
    } catch (e: any) {
        res.status(500).json({ error: e.message })
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    try {
        const movie = await db.getMovieById(id)

        res.status(200).json({ movie: movie })
    } catch (e: any) {
        res.status(500).json({ error: e.message })
        console.log(e.message)
    }
}

export const createMovie = async (req: Request, res: Response) => {
    const { title, runtimeMins, screenings } = req.body

    try {
        if (screenings) {
            const movie = await db.createMovie(title, runtimeMins, screenings)
            res.status(201).json({ movie: movie })
        } else {
            const movie = await db.createMovie(title, runtimeMins)
            res.status(201).json({ movie: movie })
        }
    } catch (e: any) {
        res.status(500).json({ error: e.message })
        console.log(e.message)
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { title, runtimeMins } = req.body
    const id = parseInt(req.params.id)

    try {
        const movie = await db.updateMovie(title, runtimeMins, id)

        res.status(201).json({ movie: movie })
    } catch (e: any) {
        res.status(500).json({ error: e.message })
        console.log(e.message)
    }
}

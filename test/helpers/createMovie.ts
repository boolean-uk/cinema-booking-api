import { Prisma } from '@prisma/client'
import prisma from '../../src/utils/prisma'

const createMovie = async (title: string, runtimeMins: number, screen: any) => {
    const movieData: Prisma.MovieCreateArgs = {
        data: {
            title: title,
            runtimeMins: runtimeMins,
        },
        include: {
            screenings: true,
        },
    }

    if (screen) {
        movieData.data.screenings = {
            create: [
                {
                    startsAt: '2022-06-11T18:30:00.000Z',
                    screenId: screen.id,
                },
            ],
        }
    }

    return await prisma.movie.create(movieData)
}

export default createMovie

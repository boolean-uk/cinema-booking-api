import { Prisma } from '@prisma/client'
import prisma from '../utils/prisma'

export const getAllMovies = async () =>
    await prisma.movie.findMany({
        include: {
            screenings: true,
        },
    })

export const getMovieById = async (id: number) =>
    await prisma.movie.findUnique({
        where: {
            id: id,
        },
        include: {
            screenings: true,
        },
    })

export const createMovie = async (
    title: string,
    runtimeMins: number,
    screenings?: Prisma.ScreeningCreateInput[]
) =>
    await prisma.movie.create({
        data: {
            title: title,
            runtimeMins: runtimeMins,
            screenings: {
                create: screenings?.map((screening) => ({
                    ...screening,
                })),
            },
        },
        include: {
            screenings: true,
        },
    })

export const updateMovie = async (
    title: string,
    runtimeMins: number,
    id: number
) =>
    await prisma.movie.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            runtimeMins: runtimeMins,
        },
        include: {
            screenings: true,
        },
    })

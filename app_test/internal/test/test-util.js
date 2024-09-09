import {prismaClient, PrismaClient} from "../app/database.js"

export const createTestBook = async (newBook) => {
    await prismaClient.book.create({
        data: {
            code: newBook.code,
            title: newBook.title,
            author: newBook.author,
            stock: newBook.stock,
        }
    })
}

export const getBookByCode = async (bookCode) => {
    const result = await prismaClient.book.findFirst({
        where:{
            code: bookCode,
        }
    })

    return result
}

export const getAllBooks = async () => {
    const result = await prismaClient.book.findMany({})
    return result
}

export const deleteBookById = async (bookId) => {
    await prismaClient.book.delete({
        where: {
            id: bookId
        }
    })
}
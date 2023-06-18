
import type { NextApiRequest, NextApiResponse } from 'next'
import authMiddleware from '../../../../middleware/authMiddleware';
import prisma from '../../../../../libs/prisma';


async function methodGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        await prisma?.topics.findMany().then(r => res.status(200).json({ message: `sucesso`, status: true }))
    } catch (e) {
        res.status(405).json({ message: `error ao pegar topico`, status: false })
    }
}
async function methodPost(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, userId } = req.body
    console.log(req.body.title, req.body.description, req.body.userId)
    if (!title || !description || !userId) {
        res.status(405).json({ message: `error ao criar topico`, status: false })
        return
    }
    try {
        prisma.topics.create({
            data: {
                title: title as string,
                description: description as string,
                userId: Number(userId),
            }
        })
            .then(r => res.status(200).json({ message: `sucesso`, status: true }))
    } catch (e) {
        res.status(405).json({ message: `error ao criar topico`, status: false })
    }
}
async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method == "GET") {
        methodGet(req, res)
        return
    }
    if (req.method == "POST") {
        methodPost(req, res)
        return
    }
}

export default authMiddleware(handler);

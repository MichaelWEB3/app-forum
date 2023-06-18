
import type { NextApiRequest, NextApiResponse } from 'next'
import authMiddleware from '../../../../middleware/authMiddleware';
import prisma from '../../../../../libs/prisma';


async function methodPost(req: NextApiRequest, res: NextApiResponse) {
    const { userId, topicsId, description } = req.body
    if (!userId || !topicsId || !description) {
        res.status(405).json({ message: `error ao criar topico`, status: false })
        return
    }
    try {
        prisma.comments.create({
            data: {
                topicsId: Number(topicsId),
                descriptionComent: description as string,
                userId: Number(userId),
            }
        })
            .then(r => res.status(200).json({ message: `sucesso`, status: true }))
    } catch (e) {
        res.status(405).json({ message: `error ao criar topico`, status: false })
    }
}
async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method == "POST") {
        methodPost(req, res)
        return
    }
}

export default authMiddleware(handler);

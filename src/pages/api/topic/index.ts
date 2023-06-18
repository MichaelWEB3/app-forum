
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../libs/prisma';

const Select = {
    select: {
        id: true,
        name: true,
        email: true
    }
}
async function methodGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        await prisma?.topics.findMany({
            include: {
                User: Select,
                Coments: {
                    include: {
                        User: Select
                    }
                }
            }
        }).then(r => res.status(200).json({ message: `sucesso`, status: true, topics: r }))
    } catch (e) {
        res.status(405).json({ message: `error ao pegar topico`, status: false })
    }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method == "GET") {
        methodGet(req, res)
        return
    }

}

export default handler;

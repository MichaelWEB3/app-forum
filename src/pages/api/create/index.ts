
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../types/User';
import HasPAss from '../../../../libs/hashpass';


const methodPost = async (req: NextApiRequest, resp: NextApiResponse) => {
    const passowrdHask: any = await HasPAss(req.body.password)
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: passowrdHask
        }
    }).then((res) => {
        resp.status(200).json({ email: res.email, status: true })
        return
    }).catch((e) => {
        resp.status(405).json({ msg: "error ao cadastrar usuario", status: false })
        return
    })
    resp.status(400).json({ msg: "erro", status: false })

}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>
) {
    if (req.method == "POST") {
        methodPost(req, res)
    }
}

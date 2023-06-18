import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../../libs/prisma';
import InsHash from "../../../../libs/insHash";
import jwt from "jsonwebtoken";


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",

    },
    jwt: { secret: process.env.NEXTAUTH_SECRET, maxAge: 60 * 60 * 40 },
    providers: [
        CredentialsProvider({
            id: "credentials",
            credentials: {
                email: { label: 'email', type: "text" },
                password: { label: 'password', type: "password" }
            },

            authorize: async (credentials, req) => {

                let usuario = null
                await prisma.user.findFirst({
                    where: { email: credentials?.email },
                }).then(async (resp:any) => {
                    const hadnelrahs = await InsHash(credentials?.password as string, resp?.password as string)
                    if (hadnelrahs) {
                        await prisma.user.findFirst({
                            include: {
                                Topics: {
                                    include: {
                                        Coments: true
                                    }
                                },
                            },
                            where: { email: credentials?.email },
                        })
                        let secret = process.env.NEXTAUTH_SECRET
                        const token = jwt.sign({ sub: { ...resp, password: "" } }, secret as string, { expiresIn: "24h" });
                        usuario = { ...resp, token: token, password: "" }
                        return usuario
                    }
                }).catch((error:any) => {
                    return null
                })
                if (usuario) {
                    return usuario
                }
                return null
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, trigger, user }) => {
            if (trigger == "update" && user) {
                // Note, that `session` can be any arbitrary object, remember to validate it!
                token = user as any
            }
            return { ...token, ...user }
        },
        session: async ({ session, token, user }) => {
            console.log(user)
            if (token) {
                session.user = token as any;
            }
            return session
        }
    },
    pages: {
        signIn: "/"
    }

}

export default NextAuth(authOptions)
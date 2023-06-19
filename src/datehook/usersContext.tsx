import React, { createContext, ReactNode } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from 'next-auth/react';
import Router from "next/router";

type Typprops = {
    children: ReactNode,
}
type appContextTypprops = {
    handlerCreat: (name: String,  email: String, password: String,) => void
    handlerLogin: (email: string, senha: string) => void

}

const defaltvalues: appContextTypprops = {
    handlerCreat: () => null,
    handlerLogin: () => null

}
const userContext = createContext<appContextTypprops>(defaltvalues)
export function UserProvider(props: Typprops) {
    async function handlerCreat(name: String, email: String, password: String,) {
        const response = await axios.post("/api/create", {
            name,
            email,
            password,
          
        }).then((resp) => {
            return resp.data
        }).catch((e) => {
            return e
        })
        return response
    }

    async function handlerLogin(email: string, senha: string) {
        const resquest = await signIn("credentials", {
            headers: { "Content-Type": "application/json" },
            redirect: false,
            email: email,
            password: senha
        })
        if (resquest && resquest.ok) {
            if (resquest) {
                return resquest
            }
        } else {
            return false
        }
    }
    return (
        <userContext.Provider value={{
         
            handlerCreat,
            handlerLogin

        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default userContext


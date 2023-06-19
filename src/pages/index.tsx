import React, { useState } from 'react'
import { Input, Button } from '@nextui-org/react';
import useDados from '../datehook/userHook';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdminLogin() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const HookDados = useDados()
    async function handlerLogin() {
        const request: any = await HookDados?.handlerLogin(email, password)

        if (request) {
            notify("Login feito com sucesso")
            Router.push("/feed")
        } else {
            notify2("Erro ao fazer login! Verifique email ou senha.")
        }

    }
    const notify = (text: string) => toast.success(text);
    const notify2 = (text: string) => toast.error(text);

    return (
        <section className={`
            bg-gray-100|
            flex  justify-center items-center
            h-screen w-screen
            bg-gray-200
        `}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="w-6/12 h-3/6 bg items-center justify-center">
                <div className="h-full w-full rounded-md bg-gradient-to-r from-blue-500 via-pink-500 to-blue-900 p-1">
                    <div className="flex h-full   p-5 flex-col w-full items-center justify-center bg-gray-200 back">
                        <h1 className=' font-semibold text-2xl  text-gray-500 mb-10'>Login</h1>
                        <div className='mb-10 w-full'>
                            <Input
                                id='testemail'
                                width='100%'
                                underlined
                                clearable
                                placeholder="Email"
                                color="primary"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className='w-full mb-10'>
                            <Input.Password
                                id='testpassword'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                width='100%'
                                underlined
                                clearable
                                placeholder="Senha"
                                color="primary" />
                        </div>


                        <Button
                            onClick={() => {
                                handlerLogin()
                            }} shadow
                            color="primary"
                            auto
                            id="buttonLogin"
                        >
                            Login
                        </Button>
                        <div className='flex  justify-end w-full'>
                            <span onClick={() => {
                                Router.push("/create")
                            }} id="criar" className=' cursor-pointer text-black'>Criar conta</span>
                        </div>
                    </div>
                </div>
            </div>

        </section >
    )
}

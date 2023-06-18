import React, { useEffect, useState } from 'react'
import { Input, Button } from '@nextui-org/react';
import useDados from '../../datehook/userHook';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdminLogin() {
    const HookDados = useDados()
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const notify = (text: string) => toast.success(text);
    const notify2 = (text: string) => toast.error(text);

    async function handlerCreat() {
        const response: any = await HookDados.handlerCreat(name, email, password)
        console.log(response)
        if (response?.status) {
            notify("Criado com sucesso!")
            setTimeout(() => {
                Router.push("/")
            }, (1000));

        } else {
            notify2("Erro ao criar!")
            notify2("Email ja pode ter sido ultilizado!")

        }

    }


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
            <div className="w-6/12 h-4/6 bg items-center justify-center">
                <div className="h-full w-full rounded-md bg-gradient-to-r from-blue-500 via-pink-500 to-blue-900 p-1">
                    <div className="flex h-full   p-5 flex-col w-full items-center justify-center bg-gray-200 back">
                        <h1 className=' font-semibold text-2xl  text-gray-500 mb-10'>Cradastrar usúario</h1>
                        <div className='mb-10 w-full flex  space-x-2'>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                width='100%'
                                underlined
                                clearable
                                placeholder="Nome"
                                color="primary" />

                        </div>
                        <div className='mb-10 w-full flex  space-x-2'>
                            <Input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                width='100%'
                                underlined
                                clearable
                                placeholder="Email"
                                color="primary" />
                        </div>
                        <div className='mb-10 w-full flex  space-x-2'>

                            <Input.Password
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                width='100%'
                                underlined
                                clearable
                                placeholder="Senha"
                                color="primary" />
                        </div>


                        <Button onClick={() => handlerCreat()} shadow color="primary" auto>
                            Cadastrar
                        </Button>
                        <div className='flex  justify-start w-full'>
                            <span onClick={() => {
                                Router.push("/")
                            }} className=' cursor-pointer text-black'>Voltar</span>
                        </div>
                    </div>
                </div>
            </div >

        </section >
    )
}


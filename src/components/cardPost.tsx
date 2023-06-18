

import React, { useEffect, useState } from 'react'
import CardComentario from './cardComentario'
import { Textarea, Button } from "@nextui-org/react";
import axios from 'axios';
import { useSession } from 'next-auth/react';

type Typeprops = {
    info?: any
}
export default function CardPost({ info }: Typeprops) {
    const [description, setdescription] = useState("")
    const { data: session, } = useSession()

    const formatData = (datast: string) => {
        const data = new Date(datast);

        // Formatar a data de acordo com o formato desejado (por exemplo, "dd/mm/aaaa hh:mm")
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`;

    }
    const handlerCreatTopic = async () => {
        try {
            const request = await axios.post("/api/protected/comment", {
                topicsId: info.id,
                userId: session?.user.id,
                description
            }, {
                headers: {
                    'Authorization': 'Bearer ' + session?.user?.token
                }
            })
            if (request?.data?.status) {
                setdescription("")
            }
        } catch (e) {
            ///await signOut()
        }

    }
    return (
        <div className="w-10/12  border-t p-5   items-center border-gray-300/50 mt-5 mb-5 flex flex-col bg-gray-200">
            <div className="w-full flex border-b border-gray-300 flex-row h-36 rounded p-2 ">
                <div className="w-3/12">
                    <div className="flex flex-row m-0" >
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                        <span className="m-2 mt-4 uppercase text-xs text-gray-500">{info?.User?.name}</span>
                    </div>
                    <span className=" ml-10 uppercase text-xs text-gray-400">{formatData(info?.dateTime)}</span>

                </div>
                <figure className="w-9/12 p-2">
                    <div className="flex mx-auto  mt-2 justify-start items-center">
                        <span className=" font-medium ">Assunto:</span>
                        <span className=" text-sm ml-2">{info?.title}</span>
                    </div>
                    <div className="flex mx-auto  mt-2  text-left w-full  text-xs text-clip  overflow-hidden ">
                        <span className=" font-medium ">Mensagem:</span>
                        <span className=" text-sm text-gray-500 ml-2">  {info?.description}</span>
                    </div>
                </figure>
            </div>
            <h1 className="mt-3 mb-3 uppercase">Comentarios</h1>
            <div className='w-full'>
                <Textarea
                    width='100%'
                    className='w-full'
                    value={description}
                    onChange={(text) => setdescription(text.target.value)}
                    label="Comentario"
                    placeholder="Digite seu Comentario"
                />
                <div className='flex flex-end'>
                    <Button
                        onClick={() => handlerCreatTopic()}
                        className="mt-5 mb-5 w-32" iconRight>
                        Enviar
                    </Button>
                </div>
            </div>

            <div className="flex  flex-col w-full justify-start">

                {info.Coments.length > 0 && info.Coments?.map((r: any, i: any) => {
                    return (
                        <CardComentario key={i} info={r} />
                    )
                })}

       
            </div>
        </div>
    )
}

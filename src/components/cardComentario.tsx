

import React, { useEffect, useState, ReactNode } from 'react'
type Typeprops = {
    info?: any
}
export default function CardComentario({ info }: Typeprops) {
    return (
        <div className="w-6/12  border border-gray-200 flex flex-row">
            <div className="w-auto flex flex-col border border-gray-400/50  h-auto rounded p-2 bg-gray-200">
                <div className="w-full">
                    <div className="flex flex-row m-0" >
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                        <span className="m-2 mt-4 uppercase  text-xs text-gray-500">{info?.User?.name}</span>
                    </div>
                </div>
                <figure className="w-full p-2">
                    <div className="flex mx-auto  mt-2  text-left w-full  text-xs text-clip  overflow-hidden ">
                        <span className=" font-medium ">Mensagem:</span>
                        <span className=" text-sm text-gray-500 ml-2">  {info?.descriptionComent} </span>
                    </div>
                </figure>
            </div>
        </div>
    )
}

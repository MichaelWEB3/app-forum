import React, { useEffect, useState, ReactNode } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';
import Menu from './menu';
type Typeprops = {
    children: ReactNode,
    page: string
}
export default function Layout({ children, page }: Typeprops) {

    return (
        <section className='w-screnn h-screnn flex flex-col '>
            <Menu page={page}></Menu>
            <div>
                {children}
            </div>
        </section>
    )
}

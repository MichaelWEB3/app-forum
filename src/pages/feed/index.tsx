import CardPost from "@/components/cardPost";
import Layout from "@/components/layout";
import useSWR from 'swr';
import { Input, Textarea, Button } from "@nextui-org/react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';

export default function Feed() {
  const { data: session, } = useSession()
  const [title, setitlte] = useState("")
  const [description, setdescription] = useState("")
  const getTOpics = async (url: any) => {
    try {
      const request = await axios.get(url)
      if (request.data.status) {
        return request.data
      }
    } catch (e) {
      throw error;
      ///await signOut()
    }
  }
  const { data, error } = useSWR('/api/topic', getTOpics);
  console.log(data?.topics)
  const handlerCreatTopic = async () => {
    try {
      const request = await axios.post("/api/protected/topic", {
        userId: session?.user.id,
        title,
        description,

      }, {
        headers: {
          'Authorization': 'Bearer ' + session?.user?.token
        }
      })
      if (request?.data?.status) {
        setitlte("")
        setdescription("")
        notify("Postado com sucesso")
      }
    } catch (e) {
      await signOut()
    }

  }



  const notify = (text: string) => toast.success(text);
  const notify2 = (text: string) => toast.error(text);

  return (
    <Layout page="feed">
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
      <div className="w-full flex justify-center items-center">
        <div className="w-6/12 flex flex-col">
          <div className=" border-b border-gray-300/50 p-2">
            <h1 className="font-bold">Faça uma pergunta no fórum sobre Discussão geral</h1>
          </div>
          <Input
            value={title}
            onChange={(text) => setitlte(text.target.value)}
            clearable
            label="Seu assunto"
            placeholder="Digite seu assunto"
          />

          <Textarea
            value={description}
            onChange={(text) => setdescription(text.target.value)}
            label="Mensagem"
            placeholder="Digite sua mensagem"
          />
          <div className="w-full flex  justify-end">
            <Button
              onClick={() => handlerCreatTopic()}
              className="mt-5 w-32" iconRight>
              Enviar
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col  items-center justify-center">
        {data?.topics?.length > 0 && data?.topics?.map((r: any, i: any) => {
          return (
            <CardPost key={i} info={r} />
          )
        })}
      </div>
    </Layout>
  )
}
export const getServerSideProps = async (context: any) => {

  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {

    }
  }

}
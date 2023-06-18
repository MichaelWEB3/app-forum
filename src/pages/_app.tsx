import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../datehook/usersContext';
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  )
}

export default MyApp

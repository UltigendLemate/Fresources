import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Head>
        <script
          src='https://kit.fontawesome.com/c49340e03a.js'
          crossOrigin='anonymous'
          defer
        />
      </Head>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp

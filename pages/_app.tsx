import type { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src='https://kit.fontawesome.com/c49340e03a.js'
        crossOrigin='anonymous'
        defer
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

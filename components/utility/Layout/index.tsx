import React from 'react'
import Footer from '../Footer'

type Props = {
  children: React.ReactNode
  className?: string
}

const Layout = (props: Props) => {
  return (
    <div
      className={`pt-8 ${props.className} overflow-x-hidden relative min-h-screen flex flex-col gap-10 justify-between`}
    >
      <div className={`${props.className}`}>{props.children}</div>
      <Footer />
      <div className='fixed top-0 h-screen w-screen overflow-hidden bg-gradient-to-b  glass-gradient -z-10'>
        <div className='ball bg-primary-red -left-20 bottom-4 opacity-30' />
        <div className='ball bg-primary-green right-8 -bottom-10 opacity-60' />
        <div className='ball bg-primary-violet right-10 top-0 opacity-30' />
      </div>
    </div>
  )
}

export default Layout

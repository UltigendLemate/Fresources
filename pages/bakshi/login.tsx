/* eslint-disable no-console */
import Button from 'components/utility/Button'
import Layout from 'components/utility/Layout'
import Link from 'next/link'
import { FormEventHandler, useRef } from 'react'
import useAuth, { AuthProvider } from '~/auth/context'

const LoginForm = () => {
  const auth = useAuth()
  const password_r = useRef<HTMLInputElement | null>(null)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    console.log(auth)
    await auth.login(password_r.current!.value)
  }

  return (
    <>
      {auth.user ? (
        <>
          <Link href='/bakshi' passHref>
            <button>Logged In</button>
          </Link>
          <div>
            <Link href='/api/auth/logout' passHref>
              <button>Log Out</button>
            </Link>
          </div>
        </>
      ) : (
        <Layout className='h-screen'>
          <h1 className='text-5xl text-white text-center font-bold mt-10 fresources'>
            Login
          </h1>
          <p>{auth.error}</p>
          {auth.loading ? (
            <div className='flex items-center justify-center h-60'>
              <label className='text-lg text-white'>Loading</label>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className='w-fit mx-auto shadow-xl bg-[#ffffff05] p-8 rounded-lg mt-20 text-white'
            >
              <div className='flex flex-col sm:flex-row gap-10'>
                {/* <div className='flex flex-col'>
              <label className='text-lg'>Username</label>
              <input
                type='text'
                placeholder='enter your username'
                className='p-2 mt-3 bg-transparent border-0 border-b-[1px]'
              />
            </div> */}
                <div className='flex flex-col'>
                  <label className='text-lg'>Password</label>
                  <input
                    type='password'
                    placeholder='enter your password'
                    className='p-2 mt-3 bg-transparent border-0 border-b-[1px]'
                    ref={password_r}
                  />
                </div>
              </div>
              <Button.Glass
                value='Login'
                css='mt-5 text-white py-2'
                tooltip={false}
              />
            </form>
          )}
        </Layout>
      )}
    </>
  )
}

const Login = () => {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}

export default Login

import Button from 'components/utility/Button'
import Layout from 'components/utility/Layout'

const Login = () => {
  return (
    <Layout className='h-screen'>
      <h1 className='text-5xl text-white text-center font-bold mt-10 fresources'>
        Login
      </h1>
      <form className='w-fit mx-auto shadow-xl bg-[#ffffff05] p-8 rounded-lg mt-20 text-white'>
        <div className='flex flex-col sm:flex-row gap-10'>
          <div className='flex flex-col'>
            <label className='text-lg'>Username</label>
            <input
              type='text'
              placeholder='enter your username'
              className='p-2 mt-3 bg-transparent border-0 border-b-[1px]'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg'>Password</label>
            <input
              type='password'
              placeholder='enter your password'
              className='p-2 mt-3 bg-transparent border-0 border-b-[1px]'
            />
          </div>
        </div>
        <Button.Glass
          value='Login'
          css='mt-5 text-white py-2'
          tooltip={false}
        />
      </form>
    </Layout>
  )
}

export default Login

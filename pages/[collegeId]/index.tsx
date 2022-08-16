import { Branch } from '@prisma/client'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { prisma } from '~/prisma'
import Button from '../../components/utility/Button'

interface IParams extends ParsedUrlQuery {
  college: string
}

type Props = {
  college: string
  branches: Branch[]
}

const Index: NextPage<Props> = (props: Props) => {
  const branchButtons = props.branches.map((branch, idx) => {
    return (
      <div key={idx}>
        <Button.Glass
          value={branch.name}
          key={branch.id}
          css='bg-[#ff000052]'
        />
        <div>
          <Link href='/'>
            <a>
              <Button.Glass value='1st year' />
            </a>
          </Link>
          <Link href='/'>
            <a>
              <Button.Glass value='2st year' />
            </a>
          </Link>
          <Link href='/'>
            <a>
              <Button.Glass value='3st year' />
            </a>
          </Link>
        </div>
      </div>
    )
  })

  return (
    <Layout className='w-screen pt-8 items-center overflow-x-hidden'>
      <div className='w-full lg:w-2/3 flex flex-col items-center gap-10 sm:gap-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <GlassSearch />
        <div className='text-5xl md:text-8xl font-bold'>
          <h1 className='text-white fresources'>
            {props.college.toUpperCase()}
          </h1>
        </div>

        <div>
          <div className='w-3/4 md:w-full md:p-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 text-center text-white'>
            {branchButtons}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index

export const getStaticPaths = async () => {
  const colleges = await prisma.college.findMany()
  const paths = colleges.map((college) => {
    return {
      params: { collegeId: college.name.toLowerCase() },
    }
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { collegeId } = context.params as IParams
  const branches = await prisma.branch.findMany({
    where: { college: { name: (collegeId as string).toUpperCase() } },
  })
  return { props: { college: collegeId, branches } }
}

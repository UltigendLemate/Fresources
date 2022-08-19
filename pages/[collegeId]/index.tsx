import { Branch } from '@prisma/client'
import Dropdown from 'components/utility/Dropdown'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import { year } from 'dataset'
import type { GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
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
  const [isActive, setIsActive] = useState('2nd Year')

  const yearButtons = year.map((year, index) => {
    if (index === 0) {
      return (
        <div key={index}>
          <a href='youtube.com'>
            <button
              onClick={() => setIsActive(year)}
              className={`font-bold md:text-2xl text-md shadow-[rgba(255,255,255,0.50)] rounded-xl duration-300 transition border-transparent hover:border-[#f5a607] px-6 py-3 ${
                isActive === year ? 'glass bg-green-300' : ''
              }`}
            >
              {year}
            </button>
          </a>
        </div>
      )
    } else {
      return (
        <div key={index}>
          <button
            onClick={() => setIsActive(year)}
            className={`font-bold md:text-2xl text-md shadow-[rgba(255,255,255,0.50)] rounded-xl duration-300 transition border-transparent hover:border-[#f5a607] px-6 py-3 ${
              isActive === year ? 'glass bg-[#ffffff17]' : ''
            }`}
          >
            {year}
          </button>
        </div>
      )
    }
  })

  const branchButtons = props.branches.map((branch, idx) => {
    return (
      <div key={idx}>
        <Button.Glass value={branch.name} key={branch.id} />
      </div>
    )
  })

  return (
    <Layout className='w-screen overflow-x-hidden'>
      <div className='w-full lg:w-2/3 flex flex-col items-center gap-12 sm:gap-16 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 pt-16'>
        <GlassSearch />
        <div className='mx-auto text-center hidden sm:block'>
          <div className='justify-center text-white grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 xl:gap-4 xl:px-20 mx-auto text-center'>
            {yearButtons}
          </div>
        </div>
        <div className='w-full sm:hidden'>
          <Dropdown
            isActive={isActive}
            setIsActive={setIsActive}
            options={year}
          />
        </div>
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

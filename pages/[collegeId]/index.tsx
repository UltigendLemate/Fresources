import { Branch } from '@prisma/client'
import Dropdown from 'components/utility/Dropdown'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import { firstYearTopics, year } from 'dataset'
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

  const firstYearButtons = firstYearTopics.map((topic, idx) => {
    return <Button.Glass value={topic} key={idx} />
  })

  const branchButtons = props.branches.map((branch) => {
    return <Button.Glass value={branch.name} key={branch.id} css='w-full' />
  })

  return (
    <Layout className='text-white w-screen py-8 flex flex-col gap-10 md:gap-16 items-center overflow-x-hidden'>
      <div className='w-full md:w-2/3 px-4'>
        <GlassSearch />
      </div>
      <div className='mx-auto text-center hidden md:block'>
        <h1 className='text-white fresources text-5xl md:text-7xl font-bold'>
          {props.college.toUpperCase()}
        </h1>
        <div className='justify-center text-white grid grid-cols-2 mx-auto text-center xl:grid-cols-2 xl:gap-4 xl:px-20'>
          {yearButtons}
        </div>
      </div>
      <h1 className='text-white fresources text-5xl md:text-7xl font-bold'>
        {props.college.toUpperCase()}
      </h1>
      <div className='w-full md:hidden px-4'>
        <Dropdown
          isActive={isActive}
          setIsActive={setIsActive}
          options={year}
        />
      </div>
      <div className='w-screen px-4 grid grid-cols-2 gap-6 sm:grid-cols-2 md:p-8 md:grid-cols-4 md:gap-10 lg:w-full text-center text-white overflow-x-hidden'>
        {isActive === '1st Year' ? firstYearButtons : branchButtons}
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

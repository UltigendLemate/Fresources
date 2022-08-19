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

  const branchButtons = props.branches.map((branch, idx) => {
    return (
      <div key={idx}>
        <Button.Glass value={branch.name} key={branch.id} />
      </div>
    )
  })
  const firstYearButtons = firstYearTopics.map((topic, idx) => {
    return (
      <div key={idx}>
        <Button.Glass value={topic} key={topic} />
      </div>
    )
  })

  return (
    <Layout className='w-screen overflow-x-hidden'>
      <div
        className={
          isActive == '1st Year' ? 'first-year-layout' : 'second-year-layout'
        }
      >
        <GlassSearch />
        <div className='mx-auto text-center hidden md:block'>
          <div className='justify-center text-white grid grid-cols-2 mx-auto text-center xl:grid-cols-2 xl:gap-4 xl:px-20'>
            {yearButtons}
          </div>
        </div>
        <div className='w-full md:hidden'>
          <Dropdown
            isActive={isActive}
            setIsActive={setIsActive}
            options={year}
          />
        </div>
        <div className='text-5xl md:text-7xl font-bold'>
          <h1 className='text-white fresources'>
            {props.college.toUpperCase()}
          </h1>
        </div>

        <div>
          <div className='w-screen px-4 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:w-screen md:w-screen md:p-8 md:grid-cols-4 md:gap-10 lg:w-full text-center text-white overflow-x-hidden'>
            {isActive === '1st Year' ? firstYearButtons : branchButtons}
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

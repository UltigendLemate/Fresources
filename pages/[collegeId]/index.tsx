import { Branch } from '@prisma/client'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import { firstYearTopics, year } from 'dataset'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
import { prisma } from '~/prisma'
import { useSearch } from '~/utils/search'
import Button from '../../components/utility/Button'

interface IParams extends ParsedUrlQuery {
  college: string
}

type Props = {
  college: string
  branches: Branch[]
}

const Index: NextPage<Props> = (props) => {
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
    return (
      <Button.Glass
        value={topic}
        key={idx}
        css={'sm:font-normal text-xl px-1'}
        tooltip={false}
        titlecase={false}
      />
    )
  })

  const [branches, filterBranches] = useSearch(props.branches, ['name'])

  const branchButtons = branches.map((branch) => {
    return (
      <Link
        href={`/${props.college.toLowerCase()}/${branch.name.toLowerCase()}`}
        key={branch.id}
      >
        <a>
          <Button.Glass
            value={branch.name}
            key={branch.id}
            css='w-full sm:font-normal text-xl'
            tooltip={false}
            titlecase={false}
          />
        </a>
      </Link>
    )
  })

  return (
    <Layout className='text-white w-full py-8 flex flex-col gap-10 md:gap-16 items-center overflow-x-hidden'>
      <div className='w-full md:w-4/5  px-8'>
        <GlassSearch filterResults={filterBranches} />
      </div>
      <h1 className='text-6xl text-center mt-8 mb-8 font-bold text-white fresources'>
        {props.college.toUpperCase()}
      </h1>
      {props.college.toLowerCase() === 'dtu' && (
        <div className='justify-center text-white grid grid-cols-2 mx-auto text-center xl:grid-cols-2 xl:gap-4 xl:px-20'>
          {yearButtons}
        </div>
      )}
      <div className='w-full md:w-4/5 lg:2/3 px-4 sm:px-8  justify-center items-center text-white grid grid-cols-2 pb-5 gap-5 md:grid-cols-3 xl:grid-cols-4'>
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

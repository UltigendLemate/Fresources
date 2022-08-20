/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { Course, Resource } from '@prisma/client'
import Button from 'components/utility/Button'
import Dropdown from 'components/utility/Dropdown'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import { prisma } from '~/prisma'
// import './styles.css';

interface IParams extends ParsedUrlQuery {
  course: string
}

type Data = (Course & { resources: Resource[] })[]

function Index({ data, course }: { data: Data; course: string }) {
  const [resourceState, setResourceState] = useState<{
    [key: string]: Set<Resource>
  }>({
    Book: new Set(),
    Assignment: new Set(),
    Note: new Set(),
    Project: new Set(),
    Paper: new Set(),
    Playlist: new Set(),
  })

  useEffect(() => {
    setResourceState((prev) => {
      const newState = { ...prev }
      data.forEach((course) => {
        course.resources.forEach((resource) => {
          newState[resource.type].add(resource)
        })
      })
      return newState
    })
  }, [data])

  const [isActive, setIsActive] = useState('Book')

  const buttons = Object.keys(resourceState).map((subject, index) => {
    return (
      <div key={index + subject}>
        <button
          onClick={() => setIsActive(subject)}
          className={`font-bold md:text-2xl text-md shadow-[rgba(255,255,255,0.50)] rounded-xl duration-300 transition border-transparent hover:border-[#f5a607] px-6 py-3 ${
            isActive === subject ? 'glass bg-[#ffffff17]' : ''
          }`}
        >
          {subject}
        </button>
      </div>
    )
  })
  return (
    <Layout className='w-screen'>
      <div className='w-full md:w-2/3 p-8 mx-auto'>
        <GlassSearch />
      </div>
      <p className='text-4xl text-center pb-8 font-bold text-white'>{course}</p>

      <div className='mx-auto text-center hidden sm:block'>
        <div className='justify-center text-white grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mx-auto text-center max-w-[1480px] pb-5'>
          {buttons}
        </div>
      </div>

      <div className='w-full px-4 sm:hidden'>
        <Dropdown
          isActive={isActive}
          setIsActive={setIsActive}
          options={Object.keys(resourceState)}
        />
      </div>

      <div className='w-full max-w-[1080px] px-4 justify-center mx-auto text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-4'>
        {resourceState[isActive] &&
          [...resourceState[isActive]].map((resource) => {
            return (
              <Button.Glass
                value={resource.name}
                key={resource.id}
                css={'font-medium'}
              />
            )
          })}
      </div>
    </Layout>
  )
}

export default Index

export const getServerSideProps = async (context: any) => {
  const { course } = context.params as IParams

  const data = await prisma.course.findMany({
    where: { description: course },
    include: { resources: true },
  })

  return {
    props: { data, course },
  }
}

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { Course, Resource, ResourceType } from '@prisma/client'
import Button from 'components/utility/Button'
import Dropdown from 'components/utility/Dropdown'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useMemo, useState } from 'react'
import { prisma } from '~/prisma'
import { useSearch } from '~/utils/search'

// import './styles.css';

interface IParams extends ParsedUrlQuery {
  course: string
  branch: string
}

type Data = (Course & { resources: Resource[] }) | null

const ResourceHeading = {
  Book: 'Books',
  Assignment: 'Assignments',
  Note: 'Notes',
  Project: 'Projects',
  Paper: 'Papers',
  Playlist: 'Playlist',
}

type Props = { data: Data; course: string }

function Index({ data, course }: Props) {
  if (data === null) return <h1>Course Not Found</h1>

  const [resources, filterResources] = useSearch(data!.resources, ['name'])

  const resourceState = useMemo(() => {
    const resourcesMap: Map<ResourceType, Array<Resource>> = new Map([
      ['Book', []],
      ['Assignment', []],
      ['Note', []],
      ['Project', []],
      ['Paper', []],
      ['Playlist', []],
    ])

    resources.forEach((resource) => {
      resourcesMap.get(resource.type)!.push(resource)
    })
    return resourcesMap
  }, [resources])

  const { asPath } = useRouter()

  const [isActive, setIsActive] = useState<ResourceType>('Book')

  const buttons = Array.from(resourceState.keys())
    .filter((type) => {
      return resourceState.get(type)!.length > 0
    })
    .map((subject, index) => {
      return (
        <div key={index + subject}>
          <button
            onClick={() => setIsActive(subject)}
            className={`font-bold md:text-2xl text-md shadow-[rgba(255,255,255,0.50)] rounded-xl duration-300 transition border-transparent hover:border-[#f5a607] px-6 py-3 ${
              isActive === subject ? 'glass bg-[#ffffff17]' : ''
            }`}
          >
            {ResourceHeading[subject]}
          </button>
        </div>
      )
    })
  return (
    <Layout className='text-white w-screen py-8 flex flex-col gap-10 md:gap-8 items-center overflow-x-hidden'>
      <div className='w-full md:w-4/5 lg:2/3 px-8 text-whiteo'>
        <GlassSearch filterResults={filterResources} />
      </div>
      <p className='text-6xl text-center mt-8 mb-16 font-bold text-white fresources'>
        {course.toUpperCase()}
      </p>

      <div className='mx-auto text-center hidden sm:block'>
        <div className='text-white flex justify-center gap-10 mx-auto text-center max-w-[1480px] pb-5'>
          {buttons}
        </div>
      </div>

      <div className='w-full px-4 sm:hidden'>
        <Dropdown
          isActive={isActive}
          setIsActive={setIsActive}
          options={[...resourceState.keys()].filter((type) => {
            return resourceState.get(type)!.length > 0
          })}
        />
      </div>
      <div className='w-full md:w-4/5 lg:2/3 px-8 justify-center items-center text-white grid grid-cols-2 pb-5 gap-5 md:grid-cols-3 xl:grid-cols-4'>
        {resourceState.get(isActive) &&
          resourceState.get(isActive)!.map((resource) => {
            return (
              <Link
                href={{
                  pathname: `${asPath}/file`,
                  query: { fileId: resource.url },
                }}
                key={resource.id}
                passHref
              >
                <a>
                  <Button.Glass
                    value={resource.name.split('.').slice(0, -1).join('.')}
                    css={'sm:font-medium text-xl'}
                  />
                </a>
              </Link>
            )
          })}
      </div>
    </Layout>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { course, branch } = context.params as IParams

  console.log(course, branch)

  const data = await prisma.course.findFirst({
    include: { resources: true },
    where: {
      description: course,
      branches: { some: { name: branch.toUpperCase() } },
    },
  })

  return {
    props: { data, course },
  }
}

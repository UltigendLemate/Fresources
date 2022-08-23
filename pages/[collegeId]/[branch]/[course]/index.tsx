/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { Course, Resource, ResourceType } from '@prisma/client'
import Button from 'components/utility/Button'
import Dropdown from 'components/utility/Dropdown'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useMemo, useState } from 'react'
import { prisma } from '~/prisma'
import { useSearch } from '~/utils/search'

// import './styles.css';

interface IParams extends ParsedUrlQuery {
  course: string
}

type Data = Course & { resources: Resource[] }

function Index({ data, course }: { data: Data; course: string }) {
  const [resources, filterResources] = useSearch(data.resources, ['name'])

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
            {subject}
          </button>
        </div>
      )
    })
  return (
    <Layout className='w-screen'>
      <div className='w-full md:w-2/3 p-8 mx-auto'>
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
      <div className='w-full max-w-[1080px] px-4 justify-center mx-auto text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-4'>
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
                    css={'sm:font-normal text-xl'}
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

export const getServerSideProps = async (context: any) => {
  const { course } = context.params as IParams

  const data = await prisma.course.findFirst({
    where: { description: course },
    include: { resources: true },
  })

  return {
    props: { data, course },
  }
}

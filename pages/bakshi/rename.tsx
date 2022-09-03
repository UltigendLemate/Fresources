import { Branch, College, Course, Resource } from '@prisma/client'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth, { AuthProvider } from '~/auth/context'
import { USER_TYPE } from '~/auth/deps'

type CollegeFiles = College & {
  branches: (Branch & {
    courses: (Course & {
      resources: Resource[]
    })[]
  })[]
}

const RenamePanel = () => {
  const [allFiles, setAllFiles] = useState<CollegeFiles[]>([])
  const [fetchData, setFetchData] = useState<boolean>(true)

  useEffect(() => {
    if (fetchData) {
      fetch('/api/files')
        .then((res) => res.json())
        .then((data) => setAllFiles(data))
      setFetchData(false)
    }
  }, [fetchData])

  const renameHandler = (resource: Resource) => {
    const name = prompt('Enter new name')
    const extension = resource.name.split('.').pop()
    if (name) {
      fetch('/api/rename', {
        method: 'PUT',
        body: JSON.stringify({
          id: resource.id,
          name: `${name}.${extension}`,
        }),
      }).then(() => {
        setFetchData(true)
      })
    }
  }

  const file_names = allFiles
    .find((college) => college.name === 'DTU')
    ?.branches.map((branch) => {
      return branch.courses.map((course) => {
        return course.resources.map((resource) => {
          return (
            <div
              key={resource.id}
              onClick={() => renameHandler(resource)}
              className='p-2 w-4/5 bg-slate-900 text-white rounded-lg flex justify-between hover:cursor-pointer'
            >
              <div>{resource.name.split('.').slice(0, -1).join('.')}</div>
              <div>{course.description}</div>
            </div>
          )
        })
      })
    })
  return (
    <div>
      <h1>Rename some shit</h1>
      <div className='flex flex-col gap-2 p-2'>{file_names}</div>
    </div>
  )
}

const RenamePage: NextPage = () => {
  const auth = useAuth()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState<null | boolean>(null)
  useEffect(() => {
    if (loading) {
      setLoading(false)
      fetch('/api/admin-props')
        .then((res) => res.json())
        .then(() => {
          setSuccess(true)
        })
        .catch(() => setSuccess(false))
    }
  }, [loading])
  return (
    <>
      {auth?.user?.type && auth.user.type > USER_TYPE.UNAUTHORIZED ? (
        loading || success === null ? (
          <h1>Loading please wait...</h1>
        ) : success ? (
          <RenamePanel />
        ) : (
          <h2>An error Occured!</h2>
        )
      ) : (
        <Link href='/bakshi/login' passHref>
          <button>Not logged in</button>
        </Link>
      )}
    </>
  )
}

const Rename = () => {
  return (
    <AuthProvider>
      <RenamePage />
    </AuthProvider>
  )
}

export default Rename

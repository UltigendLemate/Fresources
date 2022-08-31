import { Branch, College, Course, Resource } from '@prisma/client'
import DeleteModel from 'components/miscellaneous/DeleteModel'
import { useEffect, useState } from 'react'
import useAuth, { AuthProvider } from '~/auth/context'

type CollegeFiles = College & {
  branches: (Branch & {
    courses: (Course & {
      resources: Resource[]
    })[]
  })[]
}

const Index = () => {
  const [allFiles, setAllFiles] = useState<CollegeFiles[]>([])
  const [showDeleteModel, setShowDeleteModel] = useState<boolean>(false)
  const [fetchData, setFetchData] = useState<boolean>(true)

  const [file, setFile] = useState<{
    resource: Resource | null
    collegeName: String | null
  }>({
    resource: null,
    collegeName: null,
  })

  useEffect(() => {
    if (fetchData) {
      fetch('/api/files')
        .then((res) => res.json())
        .then((data) => setAllFiles(data))
      setFetchData(false)
    }
  }, [fetchData])

  const handleDelete = () => {
    fetch('/api/delete', {
      method: 'DELETE',
      body: JSON.stringify({
        college: file.collegeName,
        fileName: file.resource!.name,
        id: file.resource!.id,
      }),
    }).then(() => {
      setShowDeleteModel(false)
      setFetchData(true)
    })
  }

  const fileDeleteHandler = (resource: Resource, collegeName: String) => {
    setShowDeleteModel(true)
    setFile({
      resource,
      collegeName,
    })
  }

  const file_names = allFiles
    .find((college) => college.name === 'DTU')
    ?.branches.map((branch) => {
      return branch.courses.map((course) => {
        return course.resources.map((resource) => {
          return (
            <div
              key={resource.id}
              onClick={() => fileDeleteHandler(resource, 'DTU')}
              className='p-2 w-4/5 bg-slate-900 text-white rounded-lg flex justify-between'
            >
              <div>{resource.name}</div>
              <div>{course.description}</div>
            </div>
          )
        })
      })
    })
  return (
    <div>
      <h1>Delete some shit</h1>
      <DeleteModel
        showModel={showDeleteModel}
        hiddenModel={() => setShowDeleteModel(false)}
        handleDelete={handleDelete}
      />
      <div className='flex flex-col gap-2 p-2'>{file_names}</div>
    </div>
  )
}

const DeletionPanel = () => {
  const auth = useAuth()
  return auth.user ? <Index /> : <div>Not logged in</div>
}

const DeletionPage = () => {
  return (
    <AuthProvider>
      <DeletionPanel />
    </AuthProvider>
  )
}

export default DeletionPage

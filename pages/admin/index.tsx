import { Branch, College, Course, ResourceType } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import { useRef, useState } from 'react'
import { prisma } from '~/prisma'

interface UploadItem {
  name: string
  collegeId: string
  courseIds: string[]
  file: File
  type: ResourceType
}

export type Metadata = Omit<UploadItem, 'file'>

const resourceTypes: Array<ResourceType> = [
  'Book',
  'Assignment',
  'Note',
  'Project',
  'Paper',
  'Playlist',
]

type Props = {
  colleges: (College & {
    branches: (Branch & {
      courses: Course[]
    })[]
  })[]
}

interface CourseWithBranch extends Course {
  branchName: string
}

const calculateFileSize = (bytes: number) => {
  if (bytes === 0) {
    return '0 B'
  }
  const k = 1000,
    dm = 3,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const Admin: NextPage<Props> = (props) => {
  //states
  // const [_progressState, setProgressState] = useState(0)
  const [files, setFiles] = useState<UploadItem[]>([])

  //refs
  const input_ref = useRef<HTMLInputElement>(null)

  const upload = async () => {
    for (const file of files) {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()

      formData.append('file', file.file)

      // xhr.upload.addEventListener('progress', (event) => {
      //   if (event.lengthComputable) {
      //     const progress = Math.round((event.loaded * 100) / event.total)
      //     setProgressState(progress)
      //   }
      // })

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          // setProgressState(0)

          if (xhr.status >= 200 && xhr.status < 300) {
            setFiles((prev) => {
              return prev.filter((f) => f !== file)
            })
          }
        }
      }
      xhr.open('POST', '/api/upload', true)

      formData.append(
        'metadata',
        JSON.stringify({
          collegeId: file.collegeId,
          courseIds: [...new Set(file.courseIds)],
          name: file.name,
          type: file.type,
        } as Metadata)
      )

      xhr.send(formData)
    }
  }

  const handleAddFile = (event: any) => {
    const fileArray: UploadItem[] = []
    for (const file of event.target.files) {
      fileArray.push({
        file,
        name: file.name,
        collegeId: props.colleges[0].id,
        courseIds: [props.colleges[0].branches[0].courses[0].id],
        type: 'Book',
      })
    }
    setFiles((prev) => {
      return [...prev, ...fileArray]
    })
  }

  const nameChangeHandler = (name: string, index: number) => {
    setFiles((prev) => {
      const extention = prev[index].name.split('.').pop()
      return [
        ...prev.slice(0, index),
        { ...prev[index], name: `${name}.${extention}` },
        ...prev.slice(index + 1),
      ]
    })
  }

  const collegeChangeHandler = (collegeId: string, index: number) => {
    setFiles((prev) => {
      return [
        ...prev.slice(0, index),
        { ...prev[index], collegeId },
        ...prev.slice(index + 1),
      ]
    })
  }

  const courseChangeHandler = (
    courseId: string,
    courseIdIndex: number,
    index: number
  ) => {
    setFiles((prev) => {
      const newCourseIds = [...prev[index].courseIds]
      newCourseIds[courseIdIndex] = courseId
      return [
        ...prev.slice(0, index),
        { ...prev[index], courseIds: newCourseIds },
        ...prev.slice(index + 1),
      ]
    })
  }

  // eslint-disable-next-line no-unused-vars
  const addCourseHandler = (index: number) => {
    setFiles((prev) => {
      const newCourseIds = [...prev[index].courseIds]
      newCourseIds.push(props.colleges[0].branches[0].courses[0].id)
      return [
        ...prev.slice(0, index),
        { ...prev[index], courseIds: newCourseIds },
        ...prev.slice(index + 1),
      ]
    })
  }

  const resourceChangeHandler = (type: ResourceType, index: number) => {
    setFiles((prev) => {
      return [
        ...prev.slice(0, index),
        { ...prev[index], type },
        ...prev.slice(index + 1),
      ]
    })
  }

  return (
    <div>
      <input
        type={'file'}
        multiple
        onChange={handleAddFile}
        ref={input_ref}
        className='hidden'
      />

      {/* <div className='text-2xl'>{_progressState}</div> */}

      <div className='px-4 py-4'>
        <div id='options' className='flex gap-4'>
          <div
            onClick={() => input_ref.current?.click()}
            className='bg-blue-500 text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer'
          >
            Choose
          </div>
          <button
            onClick={upload}
            className={`${
              files.length > 0
                ? 'bg-blue-500'
                : 'bg-blue-300 cursor-not-allowed'
            } text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer`}
          >
            Upload
          </button>
          <div
            onClick={() => setFiles([])}
            className={`${
              files.length > 0
                ? 'bg-blue-500'
                : 'bg-blue-300 cursor-not-allowed'
            } text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer`}
          >
            Cancel
          </div>
        </div>
        <div className=' flex flex-col gap-2 mt-4 w-full'>
          {files
            .map((file, idx) => {
              return (
                <div key={idx}>
                  <div className='py-4 px-4 rounded-lg bg-slate-900 w-full text-white flex justify-between'>
                    <div>
                      {file.name} ({calculateFileSize(file.file.size)})
                    </div>
                    <div className='flex gap-2'>
                      <select
                        className='text-black'
                        onChange={(e) => {
                          collegeChangeHandler(e.target?.value, idx)
                        }}
                      >
                        {props.colleges.map(({ name, id }) => {
                          return (
                            <option key={name} value={id}>
                              {name}
                            </option>
                          )
                        })}
                      </select>
                      {file.courseIds.map((_courseId, courseIdIdx) => (
                        <select
                          className='text-black'
                          key={_courseId + courseIdIdx}
                          onChange={(e) =>
                            courseChangeHandler(
                              e.target?.value,
                              courseIdIdx,
                              idx
                            )
                          }
                        >
                          {props.colleges
                            .find((c) => c.id === file.collegeId)
                            ?.branches.map((b) => {
                              const thing = b.courses as CourseWithBranch[]
                              thing.forEach((c) => {
                                c.branchName = b.name
                              })
                              return thing
                            })
                            .flat()
                            .map((course) => (
                              <option
                                key={course.description + course.branchName}
                                value={course.id}
                              >
                                {`${course.description} / ${course.branchName}`}
                              </option>
                            ))}
                        </select>
                      ))}

                      <select
                        className='text-black'
                        onChange={(e) =>
                          resourceChangeHandler(
                            e.target?.value as ResourceType,
                            idx
                          )
                        }
                      >
                        {resourceTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>

                      {/* <button onClick={() => addCourseHandler(idx)}>
                        Add Course
                      </button> */}
                      <div className='bg-blue-700 px-3 rounded-lg cursor-pointer'>
                        Edit Name
                      </div>
                      <div
                        className='bg-red-700 px-3 rounded-lg cursor-pointer'
                        onClick={() => {
                          setFiles((prev) => {
                            return [
                              ...prev.slice(0, idx),
                              ...prev.slice(idx + 1),
                            ]
                          })
                        }}
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                  <div className='flex'>
                    <input
                      type={'text'}
                      className='border-2 rounded-l-lg px-4'
                      onChange={(e) => nameChangeHandler(e.target.value, idx)}
                    />
                    <button className='border-2 px-4 py-2 rounded-r-lg border-l-0 bg-blue-800 text-white'>
                      Submit
                    </button>
                  </div>
                </div>
              )
            })
            .reverse()}
        </div>
      </div>
    </div>
  )
}

export default Admin

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const colleges = await prisma.college.findMany({
    include: { branches: { include: { courses: true } } },
  })
  return {
    props: { colleges },
  }
}

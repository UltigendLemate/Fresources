import { Branch, College, Course, ResourceType } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react'
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

const uploadFile = async (
  file: UploadItem,
  setProgressState: Dispatch<SetStateAction<number>>,
  setFiles: Dispatch<SetStateAction<UploadItem[]>>
) => {
  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  formData.append('file', file.file)

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded * 100) / event.total)
      setProgressState(progress)
    }
  })

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      setProgressState(0)

      if (xhr.status >= 200 && xhr.status < 300) {
        setFiles((prev) => {
          return prev.filter((f) => f !== file)
        })
      }
    }
  }

  xhr.open('POST', '/api/upload', false)

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

const Admin: NextPage<Props> = (props) => {
  const [progressState, setProgressState] = useState(0)
  const [files, setFiles] = useState<UploadItem[]>([])
  const [defaultSelections, setDefaultSelections] = useState<{
    collegeId: string
    courseId: string
    courseDescription: string
    courseName: string
    type: ResourceType
  }>({
    collegeId: '',
    courseId: '',
    courseDescription: '',
    courseName: '',
    type: 'Book',
  })

  const input_ref = useRef<HTMLInputElement>(null)

  const upload = async () => {
    for (const file of files) {
      await uploadFile(file, setProgressState, setFiles)
    }
  }

  const handleAddFile = (event: any) => {
    const fileArray: UploadItem[] = []
    for (const file of event.target.files) {
      fileArray.push({
        file,
        name: file.name,
        collegeId: defaultSelections.collegeId
          ? defaultSelections.collegeId
          : props.colleges[0].id,
        courseIds: [
          defaultSelections.courseId
            ? defaultSelections.courseId
            : props.colleges[0].branches[0].courses[0].id,
        ],
        type: defaultSelections.type ? defaultSelections.type : 'Book',
      })
    }
    setFiles((prev) => {
      return [...prev, ...fileArray]
    })
  }

  const nameChangeHandler = (name: string, index: number) => {
    setFiles((prev) => {
      const extension = prev[index].name.split('.').pop()
      return [
        ...prev.slice(0, index),
        { ...prev[index], name: `${name}.${extension}` },
        ...prev.slice(index + 1),
      ]
    })
  }

  const collegeChangeHandler = (collegeId: string, index: number) => {
    setFiles((prev) => {
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          collegeId,
          courseIds: [coursesWithBranch.get(collegeId)![0].id],
        },
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

  /*
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
  */

  const resourceChangeHandler = (type: ResourceType, index: number) => {
    setFiles((prev) => {
      return [
        ...prev.slice(0, index),
        { ...prev[index], type },
        ...prev.slice(index + 1),
      ]
    })
  }

  const coursesWithBranch = useMemo(
    () =>
      new Map(
        props.colleges.map((c) => [
          c.id,
          c.branches
            .map((b) => {
              const thing = b.courses as CourseWithBranch[]
              thing.forEach((c) => {
                c.branchName = b.name
              })
              return thing
            })
            .flat(),
        ])
      ),
    [props.colleges]
  )

  return (
    <div>
      <input
        type={'file'}
        multiple
        onChange={handleAddFile}
        ref={input_ref}
        className='hidden'
      />
      <div className='p-4'>
        <h1 className='text-2xl font-extrabold mb-3'>Set Default Selectors</h1>
        <div className='flex gap-4'>
          <select
            className='text-black border-2 rounded-lg px-4 py-2'
            onChange={(e) => {
              setDefaultSelections({
                ...defaultSelections,
                courseId: '',
                collegeId: e.target.value,
              })
            }}
          >
            <option value=''>Select College</option>
            {props.colleges.map(({ name, id }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              )
            })}
          </select>
          {defaultSelections.collegeId && (
            <select
              className='text-black border-2 rounded-lg px-4 py-2'
              onChange={(e) => {
                setDefaultSelections({
                  ...defaultSelections,
                  courseId: e.target.value,
                })
              }}
            >
              <option value=''>Select Course</option>
              {coursesWithBranch
                .get(defaultSelections.collegeId)!
                .map((course) => {
                  return (
                    <option
                      key={course.id + course.branchName}
                      value={course.id}
                    >
                      {`${course.description} / ${course.branchName}`}
                    </option>
                  )
                })}
            </select>
          )}

          {defaultSelections.collegeId && (
            <select
              className='text-black border-2 rounded-lg px-4 py-2'
              onChange={(e) => {
                setDefaultSelections({
                  ...defaultSelections,
                  courseId: e.target.value,
                })
              }}
            >
              <option value=''>Select Course</option>
              {coursesWithBranch
                .get(defaultSelections.collegeId)!
                .map((course) => {
                  return (
                    <option
                      key={course.id + course.branchName}
                      value={course.id}
                    >
                      {`${course.description} / ${course.branchName}`}
                    </option>
                  )
                })}
            </select>
          )}
          <select
            className='text-black border-2 rounded-lg px-4 py-2'
            onChange={(e) => {
              setDefaultSelections({
                ...defaultSelections,
                type: e.target.value as ResourceType,
              })
            }}
          >
            <option>Select Resource Type</option>
            {resourceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='text-2xl'>{progressState}</div>

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
            .map((file, fileIdx) => {
              return (
                <div key={fileIdx}>
                  <div className='py-4 px-4 rounded-lg bg-slate-900 w-full text-white flex justify-between'>
                    <div>
                      {file.name} ({calculateFileSize(file.file.size)})
                    </div>
                    <div className='flex gap-2'>
                      <select
                        className='text-black'
                        onChange={(e) => {
                          collegeChangeHandler(e.target?.value, fileIdx)
                        }}
                        value={file.collegeId}
                      >
                        {props.colleges.map(({ name, id }) => {
                          return (
                            <option key={id} value={id}>
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
                              e.target.value,
                              courseIdIdx,
                              fileIdx
                            )
                          }
                          value={file.courseIds[courseIdIdx]}
                        >
                          {coursesWithBranch
                            .get(file.collegeId)!
                            .map((course) => (
                              <option
                                key={course.id + course.branchName}
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
                            fileIdx
                          )
                        }
                        value={file.type}
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
                        className='bg-red-700 px-3 rounded-lg cursor-pointer grid place-items-center'
                        onClick={() => {
                          setFiles((prev) => {
                            return [
                              ...prev.slice(0, fileIdx),
                              ...prev.slice(fileIdx + 1),
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
                      className='border-2 rounded-lg px-4 w-1/2 py-2 mt-1 '
                      onChange={(e) =>
                        nameChangeHandler(e.target.value, fileIdx)
                      }
                      placeholder='Type here to change the file name'
                    />
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
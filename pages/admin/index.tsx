import { Branch, College, Course } from '@prisma/client'
import type { GetStaticProps, NextPage } from 'next'
import { useRef, useState } from 'react'
import { prisma } from '~/prisma'

interface UploadItem {
  name: string
  college: string
  course: string | null
  courseId: string
  file: File
}

export type Metadata = Omit<UploadItem, 'file'>

type Props = {
  branches: (Branch & {
    college: College
    courses: Course[]
  })[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const branches = await prisma.branch.findMany({
    include: { college: true, courses: true },
  })

  return {
    props: { branches },
  }
}

const calculateFileSize = (bytes: number) => {
  if (bytes === 0) {
    return '0 B'
  }
  let k = 1000,
    dm = 3,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const Admin: NextPage<Props> = (props) => {
  //states
  const [_progressState, setProgressState] = useState(0)
  const [files, setFiles] = useState<UploadItem[]>([])

  //refs
  const input_ref = useRef<HTMLInputElement>(null)

  const upload = async (e: any) => {
    for (const file of files) {
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
            console.log('done')
            setFiles((prev) => {
              return prev.filter((f) => f !== file)
            })
          } else {
            console.log('error')
          }
        }
      }
      xhr.open('POST', '/api/upload', true)

      formData.append(
        'metadata',
        JSON.stringify({
          college: file.college,
          course: file.course,
          courseId: file.courseId,
          name: file.name,
        })
      )

      xhr.send(formData)
    }
  }

  const handleAddFile = (event: any) => {
    let fileArray: UploadItem[] = []
    for (let file of event.target.files) {
      fileArray.push({
        file,
        name: file.name,
        college: props.branches[0].college.name,
        course: props.branches[0].courses[0].description,
        courseId: props.branches[0].courses[0].id,
      })
    }
    setFiles((prev) => {
      return [...prev, ...fileArray]
    })
  }

  const nameChangeHandler = (name: string, index: number) => {
    setFiles((prev) => {
      const extention = prev[index].name.split('.').pop()
      console.log(`${name}.${extention}`)
      return [
        ...prev.slice(0, index),
        { ...prev[index], name: `${name}.${extention}` },
        ...prev.slice(index + 1),
      ]
    })
  }

  const collegeChangeHandler = (college: string, index: number) => {
    setFiles((prev) => {
      return [
        ...prev.slice(0, index),
        { ...prev[index], college },
        ...prev.slice(index + 1),
      ]
    })
  }

  const courseChangeHandler = (
    course: string,
    courseId: string,
    index: number
  ) => {
    setFiles((prev) => {
      return [
        ...prev.slice(0, index),
        { ...prev[index], course, courseId },
        ...prev.slice(index + 1),
      ]
    })
  }

  console.log(files)

  return (
    <div>
      <input
        type={'file'}
        multiple
        onChange={handleAddFile}
        ref={input_ref}
        className='hidden'
      />
      {/* <div className='text-2xl'>{progressState}</div> */}

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
                        onClick={(e: any) => {
                          collegeChangeHandler(e.target?.value, idx)
                        }}
                      >
                        {props.branches.map(({ college }) => {
                          return (
                            <option key={college.name} value={college.name}>
                              {college.name}
                            </option>
                          )
                        })}
                      </select>
                      <select
                        className='text-black'
                        onChange={(e) => {
                          courseChangeHandler(
                            e.target?.value,
                            props.branches
                              .find((e) => e.college.name === file.college)
                              ?.courses.find(
                                (course) =>
                                  course.description === e.target.value
                              )?.id!,
                            idx
                          )
                        }}
                      >
                        {props.branches
                          .find((e) => e.college.name === file.college)
                          ?.courses.map(({ description }) => {
                            return (
                              <option key={description} value={description}>
                                {description}
                              </option>
                            )
                          })}
                      </select>
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

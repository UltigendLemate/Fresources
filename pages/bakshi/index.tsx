import { Branch, College, Course, ResourceType } from '@prisma/client'
import axios from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import useAuth, { AuthProvider } from '~/auth/context'
import { USER_TYPE } from '~/auth/deps'

interface UploadItem {
  name: string
  collegeId: string
  courseIds: string[]
  file?: File
  link?: string
  type: ResourceType
}

interface UploadFile extends UploadItem {
  file: File
  link?: never
}

interface UploadLink extends UploadItem {
  file?: never
  link: string
}

export interface Metadata extends Omit<UploadItem, 'file'> {
  message: string
  url: string
}

const resourceTypes: Array<ResourceType> = [
  'Book',
  'Assignment',
  'Note',
  'Project',
  'Paper',
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

const uploadPlaylist = async (
  data: UploadLink,
  setProgressState: Dispatch<SetStateAction<number>>,
  setPlaylists: Dispatch<SetStateAction<UploadLink[]>>,
  updateMessage?: String
) => {
  return axios
    .post('/api/upload-playlist', {
      metadata: {
        collegeId: data.collegeId,
        courseIds: [...new Set(data.courseIds)],
        name: data.name,
        type: data.type,
        message: updateMessage ?? '',
        link: data.link,
        url: '',
      } as Metadata,
    })
    .then(() => setPlaylists((prev) => prev.filter((f) => f !== data)))
    .finally(() => setProgressState(0))
}

const uploadFile = async (
  file: UploadItem,
  setProgressState: Dispatch<SetStateAction<number>>,
  setFiles: Dispatch<SetStateAction<UploadFile[]>>,
  updateMessage?: String
) => {
  const formData = new FormData()

  if (file.file) {
    formData.append('file', file.file)
    formData.append(
      'metadata',
      JSON.stringify({
        collegeId: file.collegeId,
        courseIds: [...new Set(file.courseIds)],
        name: file.name,
        type: file.type,
        message: updateMessage ?? '',
        url: '',
      } as Metadata)
    )
    setProgressState(0)
    return axios
      .post('/api/upload', formData, {
        onUploadProgress(progressEvent) {
          const percentComplete =
            (progressEvent.loaded * 100) / progressEvent.total
          setProgressState(percentComplete)
        },
      })
      .then(() => setFiles((prev) => prev.filter((f) => f !== file)))
      .finally(() => setProgressState(0))
  } else return Promise.resolve()
}

const branchArray = (data: CourseWithBranch[]): string[] => {
  const branches = [] as string[]
  data.forEach((course) => {
    if (!branches.includes(course.branchName)) {
      branches.push(course.branchName)
    }
  })
  return branches
}

const subjectArray = (data: CourseWithBranch[], branch: string): string[] => {
  const subjects = [] as string[]
  data.forEach((course) => {
    if (course.branchName === branch) {
      if (!subjects.includes(course.description)) {
        subjects.push(course.description)
      }
    }
  })
  return subjects
}

const AdminPanel: NextPage<Props> = (props) => {
  const [progressState, setProgressState] = useState(0)
  const [files, setFiles] = useState<UploadFile[]>([])
  const [playlists, setPlaylists] = useState<UploadLink[]>([])
  const [defaultSelections, setDefaultSelections] = useState<{
    collegeId: string | undefined
    courseId: string | undefined
    courseDescription: string | undefined
    courseName: string | undefined
    type: ResourceType | undefined
  }>({
    collegeId: props.colleges[3].id,
    courseId: props.colleges[3].branches[0].id,
    courseDescription: props.colleges[3].branches[0].name,
    courseName: props.colleges[3].branches[0].courses[0].description,
    type: 'Book',
  })

  useEffect(() => {
    if (defaultSelections.courseDescription && defaultSelections.courseName) {
      // find the course id
      const courseId = props.colleges
        .find((college) => {
          return college.id === defaultSelections.collegeId
        })
        ?.branches.find((branch) => {
          return branch.name === defaultSelections.courseDescription
        })
        ?.courses.find((course) => {
          return course.description === defaultSelections.courseName
        })?.id
      setDefaultSelections((prev) => {
        return {
          ...prev,
          courseId,
        }
      })
    }
  }, [
    defaultSelections.courseDescription,
    defaultSelections.courseName,
    props.colleges,
    defaultSelections.collegeId,
  ])

  const input_ref = useRef<HTMLInputElement>(null)

  const upload = async () => {
    if (!defaultSelections.courseDescription || !defaultSelections.courseName) {
      alert('Please select a course')
      return
    } else {
      const updateMessage = prompt('Enter the update message here...')
      if (!updateMessage) {
        return
      }
      let index = 0
      for (const file of files) {
        if (index === 0) {
          await uploadFile(file, setProgressState, setFiles, updateMessage)
          index += 1
        } else {
          await uploadFile(file, setProgressState, setFiles)
        }
      }

      for (const playlist of playlists) {
        if (index === 0) {
          await uploadPlaylist(
            playlist,
            setProgressState,
            setPlaylists,
            updateMessage
          )
          index += 1
        } else await uploadPlaylist(playlist, setProgressState, setPlaylists)
      }
    }
  }

  const handleAddFile = (event: any) => {
    const fileArray: UploadFile[] = []
    for (const file of event.target.files) {
      fileArray.push({
        file,
        name: file.name,
        collegeId: defaultSelections.collegeId
          ? defaultSelections.collegeId
          : props.colleges[3].id,
        courseIds: [
          defaultSelections.courseId
            ? defaultSelections.courseId
            : props.colleges[3].branches[0].courses[0].id,
        ],
        type: defaultSelections.type ? defaultSelections.type : 'Book',
      })
    }
    setFiles((prev) => {
      return [...prev, ...fileArray]
    })
  }

  const handleAddPlaylist = () => {
    setPlaylists((prev) => {
      return [
        ...prev,
        {
          link: '',
          name: '',
          collegeId: defaultSelections.collegeId
            ? defaultSelections.collegeId
            : props.colleges[3].id,
          courseIds: [
            defaultSelections.courseId
              ? defaultSelections.courseId
              : props.colleges[3].branches[0].courses[0].id,
          ],
          type: 'Playlist',
        },
      ]
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

  const collegeChangeHandler = (
    collegeId: string,
    index: number,
    updatePlaylists = false
  ) => {
    if (updatePlaylists) {
      setPlaylists((prev) => {
        return [
          ...prev.slice(0, index),
          {
            ...prev[index],
            collegeId,
            courseIds: coursesWithBranch.get(collegeId)?.length
              ? [coursesWithBranch.get(collegeId)![0].id]
              : [],
          },
          ...prev.slice(index + 1),
        ]
      })
    } else {
      setFiles((prev) => {
        return [
          ...prev.slice(0, index),
          {
            ...prev[index],
            collegeId,
            courseIds: coursesWithBranch.get(collegeId)?.length
              ? [coursesWithBranch.get(collegeId)![0].id]
              : [],
          },
          ...prev.slice(index + 1),
        ]
      })
    }
  }

  const courseChangeHandler = (
    courseId: string,
    courseIdIndex: number,
    index: number,
    updatePlaylists = false
  ) => {
    if (updatePlaylists) {
      setPlaylists((prev) => {
        const newCourseIds = prev[index] ? [...prev[index].courseIds] : []
        newCourseIds[courseIdIndex] = courseId

        return [
          ...prev.slice(0, index),
          { ...prev[index], courseIds: newCourseIds },
          ...prev.slice(index + 1),
        ]
      })
    } else {
      setFiles((prev) => {
        const newCourseIds = prev[index] ? [...prev[index].courseIds] : []
        newCourseIds[courseIdIndex] = courseId
        return [
          ...prev.slice(0, index),
          { ...prev[index], courseIds: newCourseIds },
          ...prev.slice(index + 1),
        ]
      })
    }
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
        <div className='text-2xl'>{progressState}%</div>
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
                  courseDescription: e.target.value,
                })
              }}
            >
              <option value=''>Select Course</option>
              {branchArray(
                coursesWithBranch.get(defaultSelections.collegeId)!
              )!.map((course) => {
                return (
                  <option key={course} value={course}>
                    {course}
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
                  courseName: e.target.value,
                })
              }}
            >
              <option value=''>Select Course</option>
              {subjectArray(
                coursesWithBranch.get(defaultSelections.collegeId)!,
                defaultSelections.courseDescription!
              )!.map((c) => {
                return (
                  <option key={c} value={c}>
                    {c}
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

      <div className='px-4 py-4'>
        <div id='options' className='flex gap-4'>
          <div
            onClick={() => input_ref.current?.click()}
            className='bg-blue-500 text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer'
          >
            Choose
          </div>

          <div
            onClick={handleAddPlaylist}
            className='bg-blue-500 text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer'
          >
            Add Playlist
          </div>

          <button
            onClick={upload}
            className={`${
              files.length > 0 || playlists.length
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

        <h3 className='mt-10'>Playlists</h3>
        <div className=' flex flex-col gap-2 mt-4 w-full'>
          {playlists.map((playlist, playlistIdx) => (
            <div key={playlistIdx} className='flex gap-4'>
              <input
                type='text'
                className='border-2 rounded-lg px-4 py-2 w-60'
                value={playlist.name}
                placeholder='Playlist Name'
                onChange={(e) => {
                  setPlaylists((prev) => {
                    return [
                      ...prev.slice(0, playlistIdx),
                      { ...prev[playlistIdx], name: e.target.value },
                      ...prev.slice(playlistIdx + 1),
                    ]
                  })
                }}
              />

              <input
                type='text'
                className='border-2 rounded-lg px-4 py-2 w-60'
                value={playlist.link}
                placeholder='Playlist URL'
                onChange={(e) => {
                  setPlaylists((prev) => {
                    return [
                      ...prev.slice(0, playlistIdx),
                      { ...prev[playlistIdx], link: e.target.value },
                      ...prev.slice(playlistIdx + 1),
                    ]
                  })
                }}
              />

              <select
                className='text-black'
                onChange={(e) => {
                  collegeChangeHandler(e.target?.value, playlistIdx, true)
                }}
                value={playlist.collegeId}
              >
                {props.colleges.map(({ name, id }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  )
                })}
              </select>

              {playlist.courseIds.map((_courseId, courseIdIdx) => (
                <select
                  className='text-black'
                  key={_courseId + courseIdIdx}
                  onChange={(e) =>
                    courseChangeHandler(
                      e.target.value,
                      courseIdIdx,
                      playlistIdx,
                      true
                    )
                  }
                  value={playlist.courseIds[courseIdIdx]}
                >
                  {coursesWithBranch.get(playlist.collegeId)!.map((course) => (
                    <option
                      key={course.id + course.branchName}
                      value={course.id}
                    >
                      {`${course.description} / ${course.branchName}`}
                    </option>
                  ))}
                </select>
              ))}

              <div
                className='bg-red-700 text-white px-3 rounded-lg cursor-pointer grid place-items-center'
                onClick={() => {
                  setPlaylists((prev) => {
                    return [
                      ...prev.slice(0, playlistIdx),
                      ...prev.slice(playlistIdx + 1),
                    ]
                  })
                }}
              >
                Remove
              </div>
            </div>
          ))}
        </div>

        <h3 className='pt-10'>Files</h3>
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

const AdminPage: NextPage = () => {
  const auth = useAuth()
  const [props, setProps] = useState<Props | null>(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState<null | boolean>(null)
  useEffect(() => {
    if (loading) {
      setLoading(false)
      fetch('/api/admin-props')
        .then((res) => res.json())
        .then((data) => {
          setProps({ colleges: data })
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
          <AdminPanel {...props!} />
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

const Admin: NextPage = () => {
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  )
}

export default Admin

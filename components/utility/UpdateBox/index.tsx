import { UpdatesResponse } from 'pages/api/get-updates'
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'

type Props = {
  openDropdown: boolean
  setOpenDropdown: Dispatch<SetStateAction<boolean>>
  content: string[]
}

const UpdateBox = (props: Props) => {
  const [updates, setUpdates] = useState<UpdatesResponse>([])
  const hideUpdate = () => {
    props.setOpenDropdown(false)
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', hideUpdate)
  }

  useEffect(() => {
    fetch('/api/get-updates')
      .then((res) => res.json())
      .then((data) => setUpdates(data))
  }, [])

  return (
    <div
      className={`h-screen w-screen top-0 left-0 fixed z-20 ${
        !props.openDropdown && 'hidden'
      }`}
      onClick={() => props.setOpenDropdown(false)}
    >
      <div className='bg-[#020317df] rounded-b-lg absolute z-30 transition-all right-2 rounded-lg top-[17%] text-lg custom-scroll border-2 border-[#caacf489] divide-y-2 divide-slate-600 shadow-lg w-[90%] sm:w-[400px]'>
        <div className='p-4 text-xl font-bold text-center'>Latest Updates</div>
        <div className='overflow-y-scroll max-h-[300px] divide-y-[0.5px] divide-slate-600 custom-scroll'>
          {!updates.length ? (
            <div className='text-white p-4 cursor-pointer hover:bg-gray-600 transition-all'>
              No Updates
            </div>
          ) : (
            updates.map((update) => {
              return (
                <div className='divide-y' key={update.id}>
                  <a href={update.url}>
                    <div className='text-white p-4 cursor-pointer hover:bg-gray-600 transition-all flex justify-between'>
                      <div>
                        <div>{update.message}</div>
                        <div className='text-sm text-[#d9d9d9] italic'>
                          {new Date(update.timeStamp).toLocaleTimeString()} -{' '}
                          {new Date(update.timeStamp).toLocaleDateString()}
                        </div>
                      </div>
                      <div className='p-2'>{update.url.split('/')[4]}</div>
                    </div>
                  </a>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(UpdateBox)

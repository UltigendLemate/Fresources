import { UpdatesResponse } from 'pages/api/get-updates'
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'

type Props = {
  openDropdown: boolean
  setOpenDropdown: Dispatch<SetStateAction<boolean>>
  content: string[]
}

const UpdateBox = (props: Props) => {
  const [updates, setUpdates] = useState<UpdatesResponse>([])

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
      <div className='bg-[#020317df] rounded-b-lg absolute z-30 transition-all right-0 rounded-lg top-24 text-lg custom-scroll border-2 border-[#caacf489] divide-y-2 divide-slate-600 shadow-lg w-[90%] sm:w-[400px]'>
        <div className='p-4 text-xl font-bold text-center'>Latest Updates</div>
        <div className='overflow-y-scroll max-h-[300px] divide-y-[0.5px] divide-slate-600 custom-scroll'>
          {!updates.length ? (
            <div className='text-white p-4 cursor-pointer hover:bg-gray-600 transition-all'>
              No Updates
            </div>
          ) : (
            updates.map((update) => {
              return (
                <a href={update.url} key={update.id}>
                  <div className='text-white p-4 cursor-pointer hover:bg-gray-600 transition-all'>
                    <div>{update.message}</div>
                    <div className='text-sm text-[#d9d9d9] italic'>
                      {new Date(update.timeStamp).toLocaleTimeString()} -{' '}
                      {new Date(update.timeStamp).toLocaleDateString()}
                    </div>
                  </div>
                </a>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(UpdateBox)

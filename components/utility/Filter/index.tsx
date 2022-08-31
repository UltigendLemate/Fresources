
export const Filter = () => {

  return (
    <div className=" item-center ">
      <input
        type={'file'}

        className='hidden'
      />
      <div className='p-4'>
        <div className='flex gap-4'>
          <select
            className='text-black border-2 rounded-lg px-4 py-2'

          >
            <option value=''>Select College</option>

          </select>

          <select
            className='text-black border-2 rounded-lg px-4 py-2'

          >
            <option>Select Branch</option>

          </select>
          <select
            className='text-black border-2 rounded-lg px-4 py-2'

          >
            <option>Select Subject</option>

          </select>
          <select
            className='text-black border-2 rounded-lg px-4 py-2'

          >
            <option>File Type</option>

          </select>
        </div>
      </div>
      <div className='text-2xl'></div>
      <div className='px-4 py-4 items-center'>
        <div
          className='bg-blue-500 text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer'
        >
          Choose
        </div>
      </div>
    </div>
  )
}



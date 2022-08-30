export const Filter = () => {
  return (
    <div className="flex item-center ">
      <input
        type={'file'}
        multiple
        // onChange={props.handleAddFile}
        // ref={props.input_ref}
        className='hidden'
      />
      <div className='p-4'>
        <h1 className='text-2xl font-extrabold mb-3'>Set Default Selectors</h1>
        <div className='flex gap-4'>
          <select
            className='text-black border-2 rounded-lg px-4 py-2'

          >
            <option value=''>Select College</option>

          </select>



          <select
            className='text-black border-2 rounded-lg px-4 py-2'

          >
            <option>Select Resource Type</option>

          </select>
        </div>
      </div>

      <div className='text-2xl'></div>

      <div className='px-4 py-4 items-center'>
        <div id='options' className='flex gap-4 mt-10'>
          <div
            // onClick={() => props.input_ref.current?.click()}
            className='bg-blue-500 text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer'
          >
            Choose
          </div>
          <button
            // onClick={props.upload}
            className={`${1 > 0
              ? 'bg-blue-500'
              : 'bg-blue-300 cursor-not-allowed'
              } text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer`}
          >
            Upload
          </button>
          <div
            // onClick={() => setFiles([])}
            className={`${1 > 0
              ? 'bg-blue-500'
              : 'bg-blue-300 cursor-not-allowed'
              } text-white text-2xl font-bold w-fit py-2 px-6 rounded-lg cursor-pointer`}
          >
            Cancel
          </div>
        </div>

      </div>
    </div>
  )
}



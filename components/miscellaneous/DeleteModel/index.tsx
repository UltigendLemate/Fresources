import Button from 'components/utility/Button'

type Props = {
  showModel: boolean
  hiddenModel: () => void
  handleDelete: () => void
}

const DeleteModel = (props: Props) => {
  return (
    <div
      className={`h-screen w-full fixed bg-[#000000a4] text-white glass top-0 grid place-items-center ${
        !props.showModel && 'hidden'
      }`}
    >
      <div className='flex flex-col gap-8'>
        <h1 className='text-3xl font-bold'>
          Are you sure you want to delete this file?
        </h1>
        <div className='flex justify-between gap-10'>
          <div onClick={props.handleDelete} className='w-full'>
            <Button.Glass value='Yes' css='border-blue-800' />
          </div>
          <div onClick={props.hiddenModel} className='w-full'>
            <Button.Glass value='No' css='border-blue-800' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModel

type Props = {}

const Dropdown = (props: Props) => {
  return (
    <div className='flex flex-col w-40 absolute -left-8'>
      <button className='dropdownIcons'>1st year</button>

      <button className='dropdownIcons'>2nd year</button>

      <button className='dropdownIcons'>3rd year</button>
    </div>
  )
}

export default Dropdown

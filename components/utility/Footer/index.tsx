const Footer = () => {
  return (
    <div className='text-white bg-transparent flex flex-col py-4 justify-around items-center gap-8 text-base md:text-xl mx-auto px-auto rounded-xl font-bold border-2 border-transparent'>
      {/* <div className='flex justify-around items-center gap-12'>
        <a href=''>About Us</a>
        <a href=''>Donation</a>
      </div> */}
      <div className='flex justify-around gap-6 items-center'>
        <a
          rel='noreferrer'
          target='_blank'
          href='https://www.linkedin.com/company/fresources.tech/'
        >
          <i className='fa-brands fa-linkedin fa-xl' />
        </a>
        <a
          rel='noreferrer'
          target='_blank'
          href='https://www.youtube.com/channel/UCy59f7Hv0rzmwhVkKO1esdA'
        >
          <i className='fa-brands fa-youtube fa-xl' />
        </a>
        <a
          rel='noreferrer'
          target='_blank'
          href='https://chat.whatsapp.com/DZ5QUqZ66tSIAn9v6wDVfn'
        >
          <i className='fa-brands fa-whatsapp fa-xl' />
        </a>
      </div>
    </div>
  )
}

export default Footer

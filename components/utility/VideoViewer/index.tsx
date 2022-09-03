type Props = {
  allowFullScreen?: boolean
  src: string
}

const VideoViewer = (props: Props) => {
  return (
    <iframe
      // className='w-4/5 aspect-video mx-auto'
      title='YouTube video player'
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      className='w-4/5 aspect-video mx-auto rounded-xl shadow-xl shadow-zinc-500'
      {...props}
    ></iframe>
  )
}

export default VideoViewer

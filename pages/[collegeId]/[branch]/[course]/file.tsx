import Layout from 'components/utility/Layout'
import PdfViewer from 'components/utility/PdfViewer'
import VideoViewer from 'components/utility/VideoViewer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Index = () => {
  const router = useRouter()
  const { fileId } = router.query
  const [fileURL, setFileURL] = useState<string>(fileId as string)
  useEffect(() => {
    const path = new URLSearchParams(window.location.search).get('fileId')
    if (!fileURL) {
      setFileURL(path as string)
    }
  }, [fileURL])

  const title = decodeURIComponent(
    fileURL
      ?.split('/')
      .pop()
      ?.replace(/\.[^/.]+$/, '') || ''
  )

  const youtubeUrl = fileURL ? new URL(fileURL).searchParams?.get('list') : ''

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout className='w-screen h-screen justify-center flex mx-auto pt-0'>
        <div className='w-full h-full fixed'>
          {fileURL?.endsWith('pdf') ? (
            <PdfViewer link={fileURL} />
          ) : fileURL?.includes('youtube') ? (
            <VideoViewer
              src={
                'https://www.youtube.com/embed/videoseries?list=' + youtubeUrl
              }
              allowFullScreen={true}
            />
          ) : (
            <iframe src={fileURL} className='h-full w-full' />
          )}
        </div>
      </Layout>
    </>
  )
}

export default Index

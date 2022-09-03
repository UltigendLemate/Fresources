import Layout from 'components/utility/Layout'
import PdfViewer from 'components/utility/PdfViewer'
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
  return (
    <Layout className='w-screen h-screen justify-center flex mx-auto pt-0'>
      <div className='w-screen md:w-4/5 lg:w-2/3'>
        {fileURL?.endsWith('pdf') ? (
          <PdfViewer link={fileURL} />

        ) : (
          <iframe src={fileURL} className='h-full' />
        )}
      </div>
    </Layout>
  )
}

export default Index

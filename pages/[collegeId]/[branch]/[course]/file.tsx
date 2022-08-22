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
    <Layout className='md:w-screen lg:w-3/4 h-screen justify-center flex mx-auto'>
      {fileURL?.endsWith('pdf') ? (
        <PdfViewer link={fileURL} />
      ) : (
        <iframe src={fileURL} className='h-full' />
      )}
    </Layout>
  )
}

export default Index

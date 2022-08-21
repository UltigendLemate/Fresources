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
    <div className='lg:w-3/4 h-screen mx-auto overflow-y-scroll md:w-screen '>
      <Layout>
        <PdfViewer link={fileURL} />
      </Layout>
    </div>
  )
}

export default Index

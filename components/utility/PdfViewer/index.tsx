import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import {
  defaultLayoutPlugin,
  ToolbarSlot,
} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useState } from 'react'

type Props = {
  link: string
}

const renderToolbar = (Toolbar: any) => (
  <Toolbar>
    {(slots: ToolbarSlot) => {
      const {
        CurrentPageInput,
        Download,
        EnterFullScreen,
        GoToNextPage,
        GoToPreviousPage,
        NumberOfPages,
        Print,
        ShowSearchPopover,
        Zoom,
        ZoomIn,
        ZoomOut,
      } = slots
      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            width: '100%',
          }}
        >
          <div className='py-2'>
            <ShowSearchPopover />
          </div>
          <div className='py-2'>
            <ZoomOut />
          </div>
          <div className='py-2'>
            <Zoom />
          </div>
          <div className='py-2'>
            <ZoomIn />
          </div>
          <div className='py-2 ml-auto'>
            <GoToPreviousPage />
          </div>
          <div className='flex px-0 py-auto text-white justify-center items-center w-full '>
            <CurrentPageInput /> / <NumberOfPages />
          </div>
          <div className='py-2'>
            <GoToNextPage />
          </div>
          <div className='py-2'>
            <Download />
          </div>
          <div className='lg:flex hidden'>
            <div className='py-2 ml-auto'>
              <EnterFullScreen />
            </div>

            <div className='py-2'>
              <Print />
            </div>
          </div>
        </div>
      )
    }}
  </Toolbar>
)

export default function PdfViewer(props: Props) {
  const [zoom, setZoom] = useState(0.78)
  setTimeout(() => {
    setZoom(0.79)
  }, 100)
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: () => [],
  })

  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js'>
      <Viewer
        fileUrl={props.link}
        plugins={[defaultLayoutPluginInstance]}
        theme='dark'
        defaultScale={zoom}
      ></Viewer>
    </Worker>
  )
}

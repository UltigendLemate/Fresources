import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import {
  defaultLayoutPlugin,
  ToolbarSlot,
} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

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
          <div style={{ padding: '0px 2px' }}>
            <ShowSearchPopover />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomOut />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <Zoom />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomIn />
          </div>
          <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
            <GoToPreviousPage />
          </div>
          <div className='flex px-0 py-auto flex-wrap text-white justify-center items-center w-full'>
            <CurrentPageInput /> / <NumberOfPages />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <GoToNextPage />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <Download />
          </div>
          <div className='lg:flex hidden'>
            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
              <EnterFullScreen />
            </div>

            <div style={{ padding: '0px 2px' }}>
              <Print />
            </div>
          </div>
        </div>
      )
    }}
  </Toolbar>
)

export default function PdfViewer(props: Props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  })

  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js'>
      <Viewer
        fileUrl={props.link}
        plugins={[defaultLayoutPluginInstance]}
        theme='dark'
      ></Viewer>
    </Worker>
  )
}

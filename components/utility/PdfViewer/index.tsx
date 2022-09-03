type Props = {
  link: string
}

export default function MozillaPdfViewer(props: Props) {
  return (
    <div className='w-[80%] h-full flex justify-center text-center m-auto'>
      <iframe className='w-full h-full' src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${ props.link }`} />
    </div>
  )
}

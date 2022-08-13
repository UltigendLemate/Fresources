import { GetStaticProps } from 'next/types'
import { ParsedUrlQuery } from 'querystring'
import { prisma } from '../../src/prisma'

type Props = { college: string }

interface IParams extends ParsedUrlQuery {
  college: string
}

const College = (props: Props) => {
  return <div>{props.college}</div>
}

export const getStaticPaths = async () => {
  const colleges = await prisma.college.findMany()
  console.log(colleges)
  const paths = colleges.map((college) => {
    return {
      params: { college: college.name },
    }
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { college } = context.params as IParams
  return { props: { college } }
}

export default College

import AWS from 'aws-sdk'
import formidable, { File } from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/prisma'
import { Metadata } from '../bakshi'

const s3Client = new AWS.S3({
  endpoint: process.env.DO_SPACES_URL as string,
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID as string,
    secretAccessKey: process.env.DO_SPACES_SECRET as string,
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm()

  return new Promise(() => {
    form.parse(req, async (_err, fields, files): Promise<any> => {
      if (!files.file) return res.status(400).send('No file uploaded')

      const metadata: Metadata = JSON.parse(fields['metadata'] as string)

      try {
        const file = files.file as File
        const college = await prisma.college.findFirst({
          where: { id: metadata.collegeId },
        })
        const data = s3Client.putObject(
          {
            Bucket: process.env.DO_SPACES_BUCKET as string,
            Key: `${college?.name}/${metadata.name}`,
            ContentType: file.mimetype!,
            Body: fs.createReadStream(file.filepath),
            ACL: 'public-read',
          },
          (_e) => {
            if (_e) res.status(500).send(`File Upload error ${_e}`)
            else res.status(201).send(`File Upload Succeeded : ${resourceURL}`)
          }
        )
        const resourceURL = `https://${data.httpRequest.endpoint.host}${data.httpRequest.path}`
        const dbResourse = await prisma.resource.create({
          data: {
            url: resourceURL,
            name: metadata.name,
            type: metadata.type,
            courseIds: metadata.courseIds,
          },
        })

        await prisma.course.updateMany({
          where: { id: { in: metadata.courseIds } },
          data: {
            resourceIds: { push: dbResourse.id },
          },
        })

        const courseData = await prisma.course.findFirst({
          where: { id: metadata.courseIds[0] },
          include: { branches: true },
        })

        await prisma.updates.create({
          data: {
            message: metadata.message,
            url: `${metadata.url}/${college?.name}/${courseData?.branches[0].name}/${courseData?.description}`,
            collegeId: metadata.collegeId,
          },
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        // res.status(500).send('Error uploading file')
      }
    })
  })
}

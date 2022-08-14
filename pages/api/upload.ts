import AWS from 'aws-sdk'
import formidable, { File } from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/prisma'
import { Metadata } from '../admin'

const s3Client = new AWS.S3({
  endpoint: process.env.DO_SPACES_URL as string,
  region: '',
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
  form.parse(req, async (_err, fields, files): Promise<any> => {
    if (!files.file) {
      res.status(400).send('No file uploaded')
      return
    }

    const metadata: Metadata = JSON.parse(fields['metadata'] as string)

    try {
      const file = files.file as File
      const data = s3Client.putObject(
        {
          Bucket: process.env.DO_SPACES_BUCKET as string,
          Key: `${metadata.college}/${metadata.course}/${metadata.name}`,
          ContentType: file.mimetype!,
          Body: fs.createReadStream(file.filepath),
          ACL: 'public-read',
        },
        async (_e) => {
          if (_e) res.status(500).send(`File Upload error ${_e}`)
          else res.status(201).send(`File Upload Succeeded : ${resourceURL}`)
        }
      )
      const resourceURL = `https://${data.httpRequest.endpoint.host}${data.httpRequest.path}`
      await prisma.resource.create({
        data: {
          url: resourceURL,
          name: metadata.name,
          type: 'Assignment',
          courseId: metadata.courseId,
        },
      })
      console.log(resourceURL)
    } catch (e) {
      console.log(e)
      res.status(500).send('Error uploading file')
    }
  })
}

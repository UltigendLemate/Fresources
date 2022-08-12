import AWS from 'aws-sdk'
import formidable from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

const BASE_UPLOAD_URL = 'https://data-storage.sgp1.digitaloceanspaces.com/'

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
  const form = formidable()
  form.parse(req, async (_err, _fields, files) => {
    console.log('files: ', files.demo)
    if (!files.demo) {
      res.status(400).send('No file uploaded')
      return
    }
    try {
      const data = s3Client.putObject(
        {
          Bucket: process.env.DO_SPACES_BUCKET as string,
          Key: (files.demo as any).originalFilename,
          ContentType: 'application/pdf',
          Body: fs.createReadStream((files.demo as any).filepath),
          ACL: 'public-read',
        },
        async () => {
          // prisma.resource.create()
          res.status(201).send('File uploaded')
        }
      )
      console.log(data)
      return data
    } catch (e) {
      console.log(e)
      res.status(500).send('Error uploading file')
    }
  })
}

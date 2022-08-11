import AWS from 'aws-sdk'
import formidable from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

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
  form.parse(req, async (err, fields, files) => {
    console.log('files: ', files.demo)
    if (!files.demo) {
      res.status(400).send('No file uploaded')
      return
    }
    try {
      const data = s3Client.putObject(
        {
          Bucket: process.env.DO_SPACES_BUCKET as string,
          Key: files.demo.originalFilename,
          ContentType: 'application/pdf',
          Body: fs.createReadStream(files.demo.filepath),
          ACL: 'public-read',
        },
        async () => res.status(201).send('File uploaded')
      )
      console.log(data)
      return data
    } catch (e) {
      console.log(e)
      res.status(500).send('Error uploading file')
    }
  })
}

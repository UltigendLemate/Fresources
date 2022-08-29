import assert from 'assert'
import AWS from 'aws-sdk'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_KEY, validatePasswordHash } from '~/auth/validate'
import { prisma } from '~/prisma'

const s3Client = new AWS.S3({
  endpoint: process.env.DO_SPACES_URL as string,
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID as string,
    secretAccessKey: process.env.DO_SPACES_SECRET as string,
  },
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const passwordHash = getCookie(COOKIE_KEY, { req, res }) as string

    assert(
      passwordHash && validatePasswordHash(passwordHash),
      'Not authenticated'
    )
    const request_data = JSON.parse(req.body)
    res.status(200).send('success')
    // return news Promise(() => {
    if (!(request_data.college || request_data.fileName))
      return res.status(400).send('No file to delete')
    s3Client.deleteObject(
      {
        Bucket: process.env.DO_SPACES_BUCKET as string,
        Key: `${request_data.college}/${request_data.fileName}`,
      },
      (err) => {
        if (err)
          res.status(500).send('Error uploading file') // an error occurred
        else {
          res.status(200).send('File deleted')
        } // successful response
      }
    )

    await prisma.resource.delete({
      where: {
        id: request_data.id,
      },
    })
    res.status(200).send('File deleted')
  } catch (e) {
    res.status(500).send((e as Error).message)
  }
}

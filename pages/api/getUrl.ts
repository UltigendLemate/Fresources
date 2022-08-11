import AWS from 'aws-sdk'

const s3Client = new AWS.S3({
  region: '',
  accessKeyId: process.env.DO_SPACES_ID as string,
  secretAccessKey: process.env.DO_SPACES_SECRET as string,
  signatureVersion: 'v4',
  endpoint: process.env.DO_SPACES_URL as string,
})

export default async function handler(req: any, res: any) {
  const imageName = 'image'
  const params = {
    Bucket: process.env.DO_SPACES_BUCKET as string,
    Key: imageName,
    Expires: 60,
    ACL: 'public-read',
  }

  const UploadURL = await s3Client.getSignedUrl('putObject', params)
  res.status(200).send(UploadURL)
}

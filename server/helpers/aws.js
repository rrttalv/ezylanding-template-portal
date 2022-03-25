const aws = require('aws-sdk')

const getS3Client = () => {
  const {
    AWS_REGION,
    AWS_KEY,
    AWS_SECRET
  } = process.env
  return new aws.S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION
  })
}

const getTemplateFromS3 = async (templateId) => {
  try{
    const { AWS_BUCKET: Bucket } = process.env
    const s3 = getS3Client()
    const Key = `templates/${templateId}.json`
    const params = {
      Bucket,
      Key
    }
    const data = await s3.getObject(params).promise()
    return JSON.parse(new Buffer(data.Body).toString("utf8"))
  }catch(err){
    console.log(err)
    return err
  }
}


const getAssetS3Url = (assetId, extension) => {
  return `https://ezylanding-user-assets.s3.amazonaws.com/media/${assetId}.${extension}`
}

const getTemplateAssetS3Url = (assetName, extension) => {
  return `https://ezylanding-user-assets.s3.amazonaws.com/${assetName}.${extension}`
}

module.exports = {
  getAssetS3Url, getTemplateAssetS3Url,
  getTemplateFromS3
}
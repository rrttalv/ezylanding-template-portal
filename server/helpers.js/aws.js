const getAssetS3Url = (assetId, extension) => {
  return `https://ezylanding-user-assets.s3.amazonaws.com/media/${assetId}.${extension}`
}

const getTemplateAssetS3Url = (assetName, extension) => {
  return `https://ezylanding-user-assets.s3.amazonaws.com/${assetName}.${extension}`
}

module.exports = {
  getAssetS3Url, getTemplateAssetS3Url
}
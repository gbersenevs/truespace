import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadToS3(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: `videos/${Date.now()}-${fileName}`,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
}

export async function deleteFromS3(fileUrl: string): Promise<void> {
  const key = fileUrl.split('.com/')[1];
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error('S3 delete error:', error);
    throw error;
  }
}

export function getSignedUrl(key: string, expiresIn: number = 3600): string {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Expires: expiresIn,
  });
}


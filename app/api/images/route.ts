import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

const S3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: 'group-pics',
    });

    const response = await S3.send(command);
    
    const images = response.Contents?.map(object => ({
      key: object.Key,
      url: `/api/image/${object.Key}`, // Use a proxy endpoint
      lastModified: object.LastModified,
    })) || [];

    console.log('Returning images:', JSON.stringify(images, null, 2));
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    );
  }
}
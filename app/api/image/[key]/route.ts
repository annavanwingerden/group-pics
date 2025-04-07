import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const S3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function GET(
  request: Request,
  context: { params: { key: string } }
) {
  const { key } = context.params;
  
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME || 'your-bucket-name',
      Key: decodeURIComponent(key), // Add decoding here
    });

    const response = await S3.send(command);
    
    if (!response.Body) {
      throw new Error('No image data received');
    }

    const arrayBuffer = await response.Body.transformToByteArray();

    // Create headers for the image
    const headers = new Headers();
    headers.set('Content-Type', response.ContentType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new NextResponse(arrayBuffer, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}
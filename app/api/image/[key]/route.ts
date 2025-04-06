import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const S3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  context: { params: { key: string } }
) {
  const { key } = context.params;
  
  try {
    const command = new GetObjectCommand({
      Bucket: 'group-pics',
      Key: key,
    });

    const response = await S3.send(command);
    
    // Convert the response to a buffer
    const arrayBuffer = await response.Body?.transformToByteArray();
    if (!arrayBuffer) {
      throw new Error('No image data received');
    }

    // Create headers for the image
    const headers = new Headers();
    headers.set('Content-Type', response.ContentType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new NextResponse(arrayBuffer, {
      headers,
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
} 
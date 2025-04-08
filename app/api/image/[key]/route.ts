import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { cookies } from 'next/headers';
import { getFirebaseAdmin } from '@/app/firebase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const S3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT_URL,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function GET(
    request: NextRequest,
    context: { params: { key: string } }
): Promise<NextResponse> {
    const { key } = context.params;
    
    try {
        // Get the session cookie
        const sessionCookie = (await cookies()).get('session')?.value;
        
        if (!sessionCookie) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify the session cookie
        try {
            await getFirebaseAdmin().verifySessionCookie(sessionCookie);
        } catch (error) {
            console.error('Session verification failed:', error);
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const command = new GetObjectCommand({
            Bucket: 'group-pics',
            Key: decodeURIComponent(key),
        });

        const response = await S3.send(command);
        
        if (!response.Body) {
            throw new Error('No image data received');
        }

        const arrayBuffer = await response.Body.transformToByteArray();

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
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            padding: '40px 80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '20px',
              }}
            >
              文本转义工具
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#4a5568',
                marginBottom: '40px',
              }}
            >
              在线文本转义/反转义工具
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#4a5568',
                  fontSize: '24px',
                }}
              >
                <span>🚀</span>
                <span>快速转换</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#4a5568',
                  fontSize: '24px',
                }}
              >
                <span>💡</span>
                <span>实时预览</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#4a5568',
                  fontSize: '24px',
                }}
              >
                <span>🎯</span>
                <span>一键复制</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error: unknown) {
    console.log(`Error generating OG image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 
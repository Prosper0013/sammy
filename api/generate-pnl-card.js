import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters from Telegram bot
    const username = searchParams.get('username') || '@CryptoTrader';
    const balance = searchParams.get('balance') || '12,500 ALG';
    const tokenName = searchParams.get('tokenName') || 'Algorand';
    const tokenTicker = searchParams.get('tokenTicker') || 'ALG';
    const pnlValue = searchParams.get('pnlValue') || '+45.3%';
    const pnlType = searchParams.get('pnlType') || 'profit'; // 'profit' or 'loss'
    const referralLink = searchParams.get('referralLink') || 'https://t.me/algornbot?start=CRYPTO123';
    
    // Convert your HTML to JSX for ImageResponse
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0d0d0d',
            fontFamily: 'Poppins, sans-serif',
            padding: '40px',
            position: 'relative',
          }}
        >
          {/* Background with blur effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top, rgba(29, 29, 29, 0.85), rgba(13, 13, 13, 0.9))',
              filter: 'blur(8px)',
            }}
          />
          
          {/* Main card */}
          <div
            style={{
              width: '90%',
              maxWidth: '950px',
              background: 'radial-gradient(circle at top, rgba(29, 29, 29, 0.85), rgba(13, 13, 13, 0.9))',
              padding: '25px',
              borderRadius: '22px',
              boxShadow: '0 0 25px rgba(0,255,200,0.35)',
              border: '1px solid rgba(0,255,200,0.25)',
              color: 'white',
              position: 'relative',
              zIndex: 1,
            }}
          >
            
            {/* Top Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              {/* Left: User Info */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '20px', fontWeight: '600' }}>{username}</div>
                <div style={{ fontSize: '16px', color: '#00ffc8', marginTop: '3px' }}>
                  Balance: {balance}
                </div>
              </div>

              {/* Right: Logo + Bot Name */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '22px', fontWeight: '700', marginTop: '5px' }}>
                  ALGORN
                </div>
                <div style={{ fontSize: '17px', marginTop: '3px' }}>{tokenName}</div>
                <div style={{ fontSize: '15px', opacity: 0.7 }}>{tokenTicker}</div>
              </div>
            </div>

            {/* Middle Section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '25px',
              }}
            >
              
              {/* Left: Referral Section */}
              <div style={{ width: '25%', textAlign: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  backgroundColor: '#fff', 
                  margin: '0 auto 10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#000'
                }}>
                  QR Code
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  lineHeight: '16px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: '8px',
                  borderRadius: '6px',
                }}>
                  Referral:<br/>{referralLink}
                </div>
              </div>

              {/* Middle: Rocket */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '260px', 
                  height: '150px',
                  backgroundColor: 'rgba(100,200,255,0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  border: '1px solid rgba(100,200,255,0.3)'
                }}>
                  🚀 Rocket Graphic
                </div>
              </div>

              {/* Right: PnL Box */}
              <div
                style={{
                  width: '40%',
                  background: 'rgba(17, 17, 17, 0.7)',
                  padding: '18px',
                  borderRadius: '18px',
                  boxShadow: '0 0 20px rgba(0,255,200,0.25)',
                  border: '1px solid rgba(0,255,200,0.35)',
                  textAlign: 'left',
                  backdropFilter: 'blur(5px)',
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>PNL</div>
                <div
                  style={{
                    fontSize: '34px',
                    fontWeight: '800',
                    color: pnlType === 'profit' ? '#00ff7b' : '#ff3b3b',
                    textShadow: `0 0 10px ${pnlType === 'profit' ? 'rgba(0,255,123,0.5)' : 'rgba(255,59,59,0.5)'}`,
                  }}
                >
                  {pnlValue}
                </div>

                {/* Chart Thumbnail */}
                <div
                  style={{
                    marginTop: '15px',
                    width: '100%',
                    height: '70px',
                    background: 'linear-gradient(45deg, #0d0d0d, #1a1a1a)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Chart Grid */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  
                  {/* Chart Line */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: pnlType === 'profit' 
                        ? 'linear-gradient(to top, rgba(0,255,200,0.7) 0%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(255,59,59,0.7) 0%, transparent 100%)',
                      clipPath: pnlType === 'profit' 
                        ? `polygon(
                            0% 100%, 10% 80%, 20% 85%, 30% 70%, 40% 75%,
                            50% 60%, 60% 65%, 70% 50%, 80% 55%, 90% 40%, 100% 45%, 100% 100%
                          )`
                        : `polygon(
                            0% 100%, 10% 85%, 20% 80%, 30% 90%, 40% 85%,
                            50% 95%, 60% 90%, 70% 100%, 80% 95%, 90% 100%, 100% 95%, 100% 100%
                          )`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
// api/generate-pnl-card.js
export default async function handler(request, response) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters
    const username = searchParams.get('username') || '@CryptoTrader';
    const balance = searchParams.get('balance') || '12,500 ALG';
    const tokenName = searchParams.get('tokenName') || 'Algorand';
    const tokenTicker = searchParams.get('tokenTicker') || 'ALG';
    const pnlValue = searchParams.get('pnlValue') || '+45.3%';
    const pnlType = searchParams.get('pnlType') || 'profit';

    // Simple HTML response for testing first
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>PNL Card</title>
        <style>
            body {
                margin: 0;
                padding: 40px;
                background: #0d0d0d;
                color: white;
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .card {
                background: rgba(29, 29, 29, 0.9);
                padding: 30px;
                border-radius: 20px;
                border: 2px solid #00ffc8;
                box-shadow: 0 0 20px rgba(0,255,200,0.3);
                text-align: center;
                max-width: 500px;
            }
            .username {
                font-size: 24px;
                margin-bottom: 10px;
            }
            .balance {
                color: #00ffc8;
                margin-bottom: 20px;
            }
            .pnl {
                font-size: 32px;
                font-weight: bold;
                color: ${pnlType === 'profit' ? '#00ff7b' : '#ff3b3b'};
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="username">${username}</div>
            <div class="balance">Balance: ${balance}</div>
            <div class="token">${tokenName} (${tokenTicker})</div>
            <div class="pnl">${pnlValue}</div>
            <div>PNL Card Generated Successfully! 🚀</div>
        </div>
    </body>
    </html>
    `;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const config = {
  runtime: 'edge',
};

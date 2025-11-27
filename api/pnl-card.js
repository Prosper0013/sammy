// api/pnl-card.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { query } = req;
  
  // Get parameters with defaults
  const username = query.username || '@CryptoTrader';
  const balance = query.balance || '12,500 ALG';
  const tokenName = query.tokenName || 'Algorand';
  const tokenTicker = query.tokenTicker || 'ALG';
  const pnlValue = query.pnlValue || '+45.3%';
  const pnlType = query.pnlType || 'profit';
  const referralLink = query.referralLink || 'https://t.me/algornbot?start=CRYPTO123';

  // Generate the HTML with dynamic content
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>PNL Card - ${username}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body {
        margin: 0;
        padding: 0;
        font-family: "Poppins", sans-serif;
        background: #0d0d0d;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
    }

    .pnl-card {
        width: 90%;
        max-width: 950px;
        background: radial-gradient(circle at top, rgba(29, 29, 29, 0.85), rgba(13, 13, 13, 0.9));
        padding: 25px;
        border-radius: 22px;
        box-shadow: 0 0 25px rgba(0,255,200,0.35);
        border: 1px solid rgba(0,255,200,0.25);
        color: white;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }

    .pnl-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('https://sammy-peach.vercel.app/logo.jpg');
        background-size: cover;
        background-position: center;
        filter: blur(10px) brightness(0.4);
        z-index: -1;
    }

    .top-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        position: relative;
        z-index: 2;
    }

    .user-left {
        text-align: left;
    }
    .user-left .username {
        font-size: 20px;
        font-weight: 600;
    }
    .user-left .balance {
        font-size: 16px;
        color: #00ffc8;
        margin-top: 3px;
    }

    .logo-area {
        text-align: right;
    }
    .logo-area img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        border: 1px solid rgba(0,255,200,0.3);
    }
    .bot-name {
        font-size: 22px;
        font-weight: 700;
        margin-top: 5px;
    }
    .token-name {
        font-size: 17px;
        margin-top: 3px;
    }
    .token-ticker {
        font-size: 15px;
        opacity: 0.7;
    }

    .middle-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 25px;
        position: relative;
        z-index: 2;
    }

    .ref-sec {
        width: 25%;
        text-align: center;
    }
    .ref-sec img {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.2);
    }
    .ref-text {
        font-size: 13px;
        line-height: 16px;
        word-wrap: break-word;
        background: rgba(0,0,0,0.5);
        padding: 8px;
        border-radius: 6px;
    }

    .rocket-sec img {
        width: 260px;
        height: auto;
        filter: drop-shadow(0 0 10px rgba(100,200,255,0.4));
    }

    .pnl-box {
        width: 40%;
        background: rgba(17, 17, 17, 0.7);
        padding: 18px;
        border-radius: 18px;
        box-shadow: 0 0 20px rgba(0,255,200,0.25);
        border: 1px solid rgba(0,255,200,0.35);
        text-align: left;
        backdrop-filter: blur(5px);
    }
    .pnl-title {
        font-size: 22px;
        margin-bottom: 8px;
    }
    .pnl-value.profit {
        font-size: 34px;
        color: #00ff7b;
        font-weight: 800;
        text-shadow: 0 0 10px rgba(0,255,123,0.5);
    }
    .pnl-value.loss {
        font-size: 34px;
        color: #ff3b3b;
        font-weight: 800;
        text-shadow: 0 0 10px rgba(255,59,59,0.5);
    }

    .chart-thumb {
        margin-top: 15px;
        width: 100%;
        height: 70px;
        background: linear-gradient(45deg, #0d0d0d, #1a1a1a);
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.1);
        position: relative;
        overflow: hidden;
    }
    
    .chart-line.profit {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(0,255,200,0.7) 0%, transparent 100%);
        clip-path: polygon(
            0% 100%, 10% 80%, 20% 85%, 30% 70%, 40% 75%,
            50% 60%, 60% 65%, 70% 50%, 80% 55%, 90% 40%, 100% 45%, 100% 100%
        );
    }
    
    .chart-line.loss {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(255,59,59,0.7) 0%, transparent 100%);
        clip-path: polygon(
            0% 100%, 10% 85%, 20% 80%, 30% 90%, 40% 85%,
            50% 95%, 60% 90%, 70% 100%, 80% 95%, 90% 100%, 100% 95%, 100% 100%
        );
    }
    
    .chart-grid {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 20px 20px;
    }

    .download-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00ffc8;
        color: #0d0d0d;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
    }
</style>
</head>
<body>

<button class="download-btn" onclick="downloadCard()">📥 Download Card</button>

<div class="pnl-card" id="pnlCard">
    <div class="top-row">
        <div class="user-left">
            <div class="username">${username}</div>
            <div class="balance">Balance: ${balance}</div>
        </div>
        <div class="logo-area">
            <img src="https://sammy-peach.vercel.app/logo.jpg" alt="">
            <div class="bot-name">ALGORN</div>
            <div class="token-name">${tokenName}</div>
            <div class="token-ticker">${tokenTicker}</div>
        </div>
    </div>

    <div class="middle-section">
        <div class="ref-sec">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(referralLink)}" alt="QR Code">
            <div class="ref-text">
                Referral:<br>${referralLink}
            </div>
        </div>

        <div class="rocket-sec">
            <img src="https://sammy-peach.vercel.app/rocket.png" alt="">
        </div>

        <div class="pnl-box">
            <div class="pnl-title">PNL</div>
            <div class="pnl-value ${pnlType}">${pnlValue}</div>
            <div class="chart-thumb">
                <div class="chart-grid"></div>
                <div class="chart-line ${pnlType}"></div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script>
function downloadCard() {
    const cardElement = document.getElementById('pnlCard');
    
    html2canvas(cardElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0d0d0d'
    }).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'pnl-card.png';
        link.href = image;
        link.click();
    });
}

// Auto-download after 2 seconds
setTimeout(downloadCard, 2000);
</script>

</body>
</html>
  `;

  // Send the HTML response
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}

// api/generate-pnl-card-node.js
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const {
      username = '@CryptoTrader',
      balance = '12,500 ALG',
      tokenName = 'Algorand',
      tokenTicker = 'ALG',
      pnlValue = '+45.3%',
      pnlType = 'profit'
    } = req.query;

    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 's-maxage=3600'); // Cache for 1 hour

    // Create canvas
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, width, height);

    // Draw card background
    const cardWidth = 1000;
    const cardHeight = 500;
    const cardX = (width - cardWidth) / 2;
    const cardY = (height - cardHeight) / 2;

    // Card gradient
    const gradient = ctx.createRadialGradient(
      cardX + cardWidth / 2, cardY, 0,
      cardX + cardWidth / 2, cardY, cardWidth / 2
    );
    gradient.addColorStop(0, 'rgba(29, 29, 29, 0.9)');
    gradient.addColorStop(1, 'rgba(13, 13, 13, 0.9)');

    ctx.fillStyle = gradient;
    ctx.fillRect(cardX, cardY, cardWidth, cardHeight);

    // Card border
    ctx.strokeStyle = 'rgba(0, 255, 200, 0.3)';
    ctx.lineWidth = 3;
    ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);

    // Add glow effect
    ctx.shadowColor = 'rgba(0, 255, 200, 0.5)';
    ctx.shadowBlur = 20;
    ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);
    ctx.shadowBlur = 0;

    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(username, width / 2, cardY + 80);

    ctx.fillStyle = '#00ffc8';
    ctx.font = '30px Arial';
    ctx.fillText(`Balance: ${balance}`, width / 2, cardY + 130);

    ctx.fillStyle = '#ffffff';
    ctx.font = '25px Arial';
    ctx.fillText(`${tokenName} (${tokenTicker})`, width / 2, cardY + 180);

    // PnL value
    ctx.fillStyle = pnlType === 'profit' ? '#00ff7b' : '#ff3b3b';
    ctx.font = 'bold 60px Arial';
    ctx.fillText(pnlValue, width / 2, cardY + 280);

    ctx.fillStyle = '#ffffff';
    ctx.font = '30px Arial';
    ctx.fillText('PNL Card', width / 2, cardY + 350);

    // Convert to buffer and send
    const buffer = canvas.toBuffer('image/png');
    res.end(buffer);

  } catch (error) {
    console.error('Error generating PnL card:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.handler = async (event) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hello World</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      font-family: 'Segoe UI', system-ui, sans-serif;
      overflow: hidden;
    }

    .stars {
      position: fixed;
      inset: 0;
      pointer-events: none;
    }

    .star {
      position: absolute;
      border-radius: 50%;
      background: white;
      animation: twinkle var(--d) ease-in-out infinite alternate;
      opacity: 0;
    }

    @keyframes twinkle {
      from { opacity: 0; transform: scale(0.8); }
      to   { opacity: 0.9; transform: scale(1.2); }
    }

    .card {
      text-align: center;
      padding: 3rem 4rem;
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 24px;
      box-shadow: 0 8px 60px rgba(0,0,0,0.5);
      animation: fadeUp 0.8s ease both;
      max-width: 520px;
      width: 90%;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .emoji {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
      animation: spin 6s linear infinite;
    }

    @keyframes spin {
      0%   { transform: rotate(0deg) scale(1); }
      50%  { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    }

    h1 {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(90deg, #a78bfa, #60a5fa, #34d399);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -1px;
      margin-bottom: 0.75rem;
    }

    p {
      color: rgba(255,255,255,0.6);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 0.4rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 1.5rem;
      padding: 6px 16px;
      background: rgba(99,102,241,0.25);
      border: 1px solid rgba(99,102,241,0.5);
      border-radius: 999px;
      color: #a5b4fc;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .pulse {
      width: 8px;
      height: 8px;
      background: #34d399;
      border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }
  </style>
</head>
<body>

  <div class="stars" id="stars"></div>

  <div class="card">
    <span class="emoji">🌍</span>
    <h1>Hello, World!</h1>
    <p>Deployed on AWS Lambda &amp; API Gateway</p>
    <p>Shipped via GitHub Actions CI/CD</p>
    <div class="badge">
      <span class="pulse"></span>
      LIVE
    </div>
  </div>

  <script>
    const container = document.getElementById('stars');
    for (let i = 0; i < 120; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 3 + 1;
      s.style.cssText = [
        'width:' + size + 'px',
        'height:' + size + 'px',
        'top:' + Math.random() * 100 + '%',
        'left:' + Math.random() * 100 + '%',
        '--d:' + (Math.random() * 3 + 1.5) + 's',
        'animation-delay:' + Math.random() * 4 + 's'
      ].join(';');
      container.appendChild(s);
    }
  </script>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html
  };
};

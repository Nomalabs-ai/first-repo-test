exports.handler = async (event) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Claw Memory — The AI that remembers things</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg-deep:    #050811;
      --bg-mid:     #0b1120;
      --purple:     #7c3aed;
      --indigo:     #4f46e5;
      --blue:       #2563eb;
      --cyan:       #06b6d4;
      --green:      #10b981;
      --text:       #f1f5f9;
      --muted:      rgba(148,163,184,0.75);
      --border:     rgba(255,255,255,0.08);
      --glass:      rgba(255,255,255,0.04);
    }

    html { scroll-behavior: smooth; }

    body {
      min-height: 100vh;
      background: var(--bg-deep);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      color: var(--text);
      overflow-x: hidden;
    }

    /* ── animated background ── */
    .bg-grid {
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
      background-size: 64px 64px;
      pointer-events: none;
      z-index: 0;
    }

    .bg-glow {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background:
        radial-gradient(ellipse 70% 50% at 20% 20%, rgba(124,58,237,0.18) 0%, transparent 70%),
        radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.14) 0%, transparent 70%);
    }

    /* ── stars ── */
    .stars {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
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
      to   { opacity: 0.7; transform: scale(1.3); }
    }

    /* ── layout ── */
    .wrapper {
      position: relative;
      z-index: 1;
      max-width: 860px;
      margin: 0 auto;
      padding: 80px 24px 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    /* ── eyebrow badge ── */
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 18px;
      background: rgba(124,58,237,0.15);
      border: 1px solid rgba(124,58,237,0.4);
      border-radius: 999px;
      color: #c4b5fd;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-bottom: 28px;
      animation: fadeUp 0.6s ease both;
    }
    .eyebrow .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green);
      animation: pulse 1.8s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.35; transform: scale(0.65); }
    }

    /* ── headline ── */
    h1 {
      font-size: clamp(2.6rem, 6vw, 4.5rem);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -2px;
      margin-bottom: 24px;
      animation: fadeUp 0.7s 0.1s ease both;
    }
    .grad {
      background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 45%, #34d399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ── subheadline ── */
    .sub {
      font-size: clamp(1.05rem, 2.5vw, 1.25rem);
      color: var(--muted);
      line-height: 1.7;
      max-width: 640px;
      margin-bottom: 56px;
      animation: fadeUp 0.7s 0.2s ease both;
    }

    /* ── integrations grid ── */
    .integrations {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 16px;
      width: 100%;
      margin-bottom: 64px;
      animation: fadeUp 0.7s 0.3s ease both;
    }

    .chip {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 22px 16px 18px;
      background: var(--glass);
      border: 1px solid var(--border);
      border-radius: 18px;
      transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      cursor: default;
    }
    .chip:hover {
      transform: translateY(-4px);
      border-color: rgba(255,255,255,0.18);
      background: rgba(255,255,255,0.07);
    }
    .chip-icon {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .chip-icon svg {
      width: 36px;
      height: 36px;
    }
    .chip-label {
      font-size: 0.82rem;
      font-weight: 600;
      color: rgba(226,232,240,0.85);
      letter-spacing: 0.2px;
    }

    /* ── feature pills row ── */
    .features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-bottom: 56px;
      animation: fadeUp 0.7s 0.4s ease both;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 18px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 999px;
      font-size: 0.84rem;
      color: rgba(203,213,225,0.9);
      font-weight: 500;
    }
    .pill svg { flex-shrink: 0; opacity: 0.7; }

    /* ── CTA badge ── */
    .cta-row {
      animation: fadeUp 0.7s 0.5s ease both;
    }
    .cta {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 32px;
      background: linear-gradient(135deg, var(--purple), var(--indigo));
      border-radius: 14px;
      font-weight: 700;
      font-size: 1rem;
      color: white;
      text-decoration: none;
      box-shadow: 0 0 40px rgba(124,58,237,0.35);
      transition: opacity 0.2s, transform 0.2s;
    }
    .cta:hover { opacity: 0.9; transform: scale(1.03); }

    /* ── footer ── */
    footer {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 24px;
      font-size: 0.78rem;
      color: rgba(100,116,139,0.7);
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .integrations { grid-template-columns: repeat(3, 1fr); }
    }
  </style>
</head>
<body>

  <div class="bg-grid"></div>
  <div class="bg-glow"></div>
  <div class="stars" id="stars"></div>

  <div class="wrapper">

    <div class="eyebrow">
      <span class="dot"></span>
      Nomalabs AI
    </div>

    <h1>The AI that<br><span class="grad">remembers things.</span></h1>

    <p class="sub">
      Gather memories from Gmail, Slack, Dropbox, Apple Notes, and Todoist —
      and make them available to your Claw.
    </p>

    <div class="integrations">
      <div class="chip">
        <span class="chip-icon">
          <!-- Gmail – official envelope-M mark, brand red -->
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Gmail">
            <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
          </svg>
        </span>
        <span class="chip-label">Gmail</span>
      </div>
      <div class="chip">
        <span class="chip-icon">
          <!-- Slack – official 4-color hashtag grid mark -->
          <svg viewBox="0 0 127 127" xmlns="http://www.w3.org/2000/svg" aria-label="Slack">
            <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"/>
            <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0"/>
            <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D"/>
            <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E"/>
          </svg>
        </span>
        <span class="chip-label">Slack</span>
      </div>
      <div class="chip">
        <span class="chip-icon">
          <!-- Dropbox – official open-box mark, brand blue -->
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Dropbox">
            <path fill="#0061FF" d="M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z"/>
          </svg>
        </span>
        <span class="chip-label">Dropbox</span>
      </div>
      <div class="chip">
        <span class="chip-icon">
          <!-- Apple Notes – yellow notepad with ruled lines -->
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Apple Notes">
            <rect x="2" y="2" width="20" height="20" rx="4" ry="4" fill="#FFCC00"/>
            <rect x="2" y="2" width="20" height="5" rx="4" ry="4" fill="#F5A623"/>
            <rect x="2" y="5" width="20" height="2" fill="#F5A623"/>
            <line x1="5.5" y1="11.5" x2="18.5" y2="11.5" stroke="#7A5900" stroke-width="1.2" stroke-linecap="round"/>
            <line x1="5.5" y1="14.5" x2="18.5" y2="14.5" stroke="#7A5900" stroke-width="1.2" stroke-linecap="round"/>
            <line x1="5.5" y1="17.5" x2="14"   y2="17.5" stroke="#7A5900" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="chip-label">Apple Notes</span>
      </div>
      <div class="chip">
        <span class="chip-icon">
          <!-- Todoist – official mark, brand red -->
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Todoist">
            <path fill="#DB4035" d="M21 0H3C1.35 0 0 1.35 0 3v3.858s3.854 2.24 4.098 2.38c.31.18.694.177 1.004 0 .26-.147 8.02-4.608 8.136-4.675.279-.161.58-.107.748-.01.164.097.606.348.84.48.232.134.221.502.013.622l-9.712 5.59c-.346.2-.69.204-1.048.002C3.478 10.907.998 9.463 0 8.882v2.02l4.098 2.38c.31.18.694.177 1.004 0 .26-.147 8.02-4.609 8.136-4.676.279-.16.58-.106.748-.008.164.096.606.347.84.48.232.133.221.5.013.62-.208.121-9.288 5.346-9.712 5.59-.346.2-.69.205-1.048.002C3.478 14.951.998 13.506 0 12.926v2.02l4.098 2.38c.31.18.694.177 1.004 0 .26-.147 8.02-4.609 8.136-4.676.279-.16.58-.106.748-.009.164.097.606.348.84.48.232.133.221.502.013.622l-9.712 5.59c-.346.199-.69.204-1.048.001C3.478 18.994.998 17.55 0 16.97V21c0 1.65 1.35 3 3 3h18c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3z"/>
          </svg>
        </span>
        <span class="chip-label">Todoist</span>
      </div>
    </div>

    <div class="features">
      <span class="pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        Persistent memory across apps
      </span>
      <span class="pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Always-on, 24/7
      </span>
      <span class="pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        Powered by your Claw
      </span>
    </div>

    <div class="cta-row">
      <a class="cta" href="https://openclaw.ai" target="_blank" rel="noopener">
        <span>🦾</span> Get your Claw
      </a>
    </div>

  </div>

  <footer>
    Built by Nomalabs AI &nbsp;·&nbsp; Deployed on AWS Lambda
  </footer>

  <script>
    const container = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2.5 + 0.8;
      s.style.cssText = [
        'width:'  + size + 'px',
        'height:' + size + 'px',
        'top:'    + Math.random() * 100 + '%',
        'left:'   + Math.random() * 100 + '%',
        '--d:'    + (Math.random() * 3 + 2) + 's',
        'animation-delay:' + (Math.random() * 5) + 's'
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

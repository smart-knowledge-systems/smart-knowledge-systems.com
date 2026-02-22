import { NextRequest, NextResponse } from "next/server";

const KNOT_URL = "https://knot.smart-knowledge-systems.com";
const TANGLED_PROFILE =
  "https://tangled.sh/did:plc:i2fgba5nignuw4nccml33wjp";

const PLAIN_TEXT = `
╔══════════════════════════════════════════════════════════╗
║           knot.smart-knowledge-systems.com               ║
║           Tangled knot · ATProto git hosting             ║
╚══════════════════════════════════════════════════════════╝

STATUS
  This knot runs as a local Docker container on a personal
  laptop. It is only reachable when that laptop is powered
  on and connected to the internet via Cloudflare Tunnel.

  If you're seeing this page, the knot is likely offline.

RETRY
  ${KNOT_URL}

TANGLED PROFILE (always available)
  ${TANGLED_PROFILE}

CLONE EXAMPLE (when knot is live)
  git clone https://knot.smart-knowledge-systems.com/<did>/<repo>

──────────────────────────────────────────────────────────
`.trim();

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>knot · smart-knowledge-systems.com</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --indigo-950: #1e1b4b;
      --indigo-900: #312e81;
      --indigo-700: #4338ca;
      --indigo-400: #818cf8;
      --indigo-200: #c7d2fe;
      --amber-400: #fbbf24;
      --amber-300: #fcd34d;
      --gray-400: #9ca3af;
      --gray-300: #d1d5db;
    }

    html, body {
      min-height: 100%;
      background-color: var(--indigo-950);
    }

    body {
      font-family: 'Bitter', Georgia, serif;
      color: var(--gray-300);
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
    }

    /* Dot-grid background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
      z-index: 0;
    }

    /* Ambient glow top */
    body::after {
      content: '';
      position: fixed;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 400px;
      background: radial-gradient(ellipse, rgba(67,56,202,0.35) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    main {
      position: relative;
      z-index: 1;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      max-width: 680px;
      margin: 0 auto;
      width: 100%;
    }

    /* ── HEADER STRIPE ── */
    .site-bar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 10;
      background: linear-gradient(to right, var(--indigo-950), var(--indigo-900));
      border-bottom: 1px solid rgba(99,102,241,0.2);
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .site-bar a {
      color: var(--indigo-200);
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .site-bar a:hover { opacity: 1; }

    .site-bar-sep {
      color: rgba(165,180,252,0.3);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
    }

    /* ── STATUS INDICATOR ── */
    .indicator-wrap {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2.5rem;
    }

    .pulse-ring {
      position: relative;
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }

    .pulse-ring::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: var(--amber-400);
      box-shadow: 0 0 8px 2px rgba(251,191,36,0.5);
      animation: pulse-core 2s ease-in-out infinite;
    }

    .pulse-ring::after {
      content: '';
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      border: 1.5px solid rgba(251,191,36,0.4);
      animation: pulse-ring 2s ease-in-out infinite;
    }

    @keyframes pulse-core {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.85); }
    }

    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 0.6; }
      50% { transform: scale(1.6); opacity: 0; }
      100% { transform: scale(0.8); opacity: 0; }
    }

    .status-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--amber-300);
    }

    /* ── HEADING ── */
    h1 {
      font-size: clamp(1.75rem, 5vw, 2.5rem);
      font-weight: 600;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--indigo-400);
      letter-spacing: 0.04em;
      margin-bottom: 2rem;
    }

    /* ── DIVIDER ── */
    .divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(99,102,241,0.4), transparent);
      margin-bottom: 2rem;
    }

    /* ── BODY COPY ── */
    .note {
      font-size: 1rem;
      line-height: 1.75;
      color: var(--gray-400);
      margin-bottom: 2rem;
      text-align: center;
      max-width: 520px;
    }

    .note em {
      color: var(--gray-300);
      font-style: italic;
    }

    /* ── LINK BLOCKS ── */
    .links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
      margin-bottom: 2.5rem;
    }

    .link-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(99,102,241,0.2);
      border-radius: 8px;
      padding: 0.875rem 1.25rem;
      transition: border-color 0.2s, background 0.2s;
    }

    .link-row:hover {
      border-color: rgba(99,102,241,0.5);
      background: rgba(255,255,255,0.06);
    }

    .link-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--indigo-400);
      white-space: nowrap;
      min-width: 90px;
    }

    .link-row a {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--indigo-200);
      text-decoration: none;
      word-break: break-all;
      transition: color 0.2s;
    }

    .link-row a:hover {
      color: #fff;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    /* ── CODE EXAMPLE ── */
    .code-block {
      width: 100%;
      background: rgba(0,0,0,0.35);
      border: 1px solid rgba(99,102,241,0.15);
      border-radius: 8px;
      padding: 1rem 1.25rem;
      margin-bottom: 2.5rem;
    }

    .code-block-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--indigo-400);
      margin-bottom: 0.5rem;
    }

    .code-block code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      color: var(--gray-300);
      display: block;
      white-space: pre-wrap;
      word-break: break-all;
    }

    .code-block code .prompt { color: rgba(165,180,252,0.5); user-select: none; }
    .code-block code .cmd { color: var(--amber-300); }
    .code-block code .arg { color: var(--indigo-200); }

    /* ── FOOTER NOTE ── */
    .footer-note {
      font-size: 0.8rem;
      color: rgba(156,163,175,0.5);
      text-align: center;
      line-height: 1.6;
    }

    .footer-note a {
      color: rgba(129,140,248,0.6);
      text-decoration: none;
    }

    .footer-note a:hover {
      color: var(--indigo-400);
    }

    /* ── FADE IN ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .fade-1 { animation: fadeUp 0.5s ease both; }
    .fade-2 { animation: fadeUp 0.5s 0.1s ease both; }
    .fade-3 { animation: fadeUp 0.5s 0.2s ease both; }
    .fade-4 { animation: fadeUp 0.5s 0.3s ease both; }
    .fade-5 { animation: fadeUp 0.5s 0.4s ease both; }
    .fade-6 { animation: fadeUp 0.5s 0.5s ease both; }
  </style>
</head>
<body>

  <div class="site-bar">
    <a href="https://smart-knowledge-systems.com">smart-knowledge-systems.com</a>
    <span class="site-bar-sep">/</span>
    <span style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.05em;color:rgba(199,210,254,0.5);">knot</span>
  </div>

  <main style="padding-top: 5rem;">

    <div class="indicator-wrap fade-1">
      <div class="pulse-ring"></div>
      <span class="status-label">Status · checking availability</span>
    </div>

    <h1 class="fade-2" style="text-align:center;">The knot might be sleeping.</h1>
    <p class="subtitle fade-2">knot.smart-knowledge-systems.com &nbsp;·&nbsp; ATProto git hosting</p>

    <div class="divider fade-3"></div>

    <p class="note fade-3">
      This is a self-hosted <em>Tangled knot</em> — an ATProto-enabled git server
      running as a local Docker container. It lives on a personal laptop, which means
      it&rsquo;s only reachable when that machine is <em>powered on and connected</em>.
      No cloud. No always-on server. Just a laptop doing its best.
    </p>

    <div class="links fade-4">
      <div class="link-row">
        <span class="link-label">Try knot</span>
        <a href="${KNOT_URL}" target="_blank" rel="noopener">${KNOT_URL}</a>
      </div>
      <div class="link-row">
        <span class="link-label">Tangled</span>
        <a href="${TANGLED_PROFILE}" target="_blank" rel="noopener">${TANGLED_PROFILE}</a>
      </div>
    </div>

    <div class="code-block fade-5">
      <p class="code-block-label">Clone when live</p>
      <code><span class="prompt">$ </span><span class="cmd">git clone</span> <span class="arg">https://knot.smart-knowledge-systems.com/&lt;did&gt;/&lt;repo&gt;</span></code>
    </div>

    <p class="footer-note fade-6">
      Built with <a href="https://tangled.sh" target="_blank" rel="noopener">Tangled</a>
      &amp; <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/" target="_blank" rel="noopener">Cloudflare Tunnel</a>.
      Part of the <a href="https://atproto.com" target="_blank" rel="noopener">AT Protocol</a> ecosystem.
    </p>

  </main>

</body>
</html>`;

export async function GET(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";

  if (accept.includes("text/html")) {
    return new NextResponse(HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new NextResponse(PLAIN_TEXT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

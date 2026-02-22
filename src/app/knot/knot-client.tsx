"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";

const KNOT_URL = "https://knot.smart-knowledge-systems.com";
const TANGLED_PROFILE =
  "https://tangled.sh/did:plc:i2fgba5nignuw4nccml33wjp";

type KnotStatus = "checking" | "online" | "offline";

function useKnotStatus() {
  const [status, setStatus] = useState<KnotStatus>("checking");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkStatus = useCallback(async (): Promise<KnotStatus> => {
    try {
      const res = await fetch(KNOT_URL, { method: "HEAD", mode: "cors" });
      const next: KnotStatus = res.status < 500 ? "online" : "offline";
      setStatus(next);
      return next;
    } catch {
      setStatus("offline");
      return "offline";
    }
  }, []);

  useEffect(() => {
    const startPolling = () => {
      // 10s delay before the first check
      timeoutRef.current = setTimeout(() => {
        checkStatus();
        intervalRef.current = setInterval(checkStatus, 10_000);
      }, 5_000);
    };

    const stopPolling = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    };

    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkStatus]);

  return { status, checkStatus };
}

export function KnotPageClient() {
  const { status, checkStatus } = useKnotStatus();

  const handleTryKnot = async () => {
    if (status === "online") {
      window.open(KNOT_URL, "_blank");
      return;
    }
    // Re-check before showing toast
    const freshStatus = await checkStatus();
    if (freshStatus === "online") {
      window.open(KNOT_URL, "_blank");
    } else {
      toast("The knot is offline right now — try again later");
    }
  };

  const statusConfig =
    status === "online"
      ? {
          dotColor: "#22c55e",
          glowColor: "rgba(34,197,94,0.5)",
          labelColor: "#4ade80",
          label: "Status · online",
          dotAnimation: "none",
          ringAnimation: "none",
        }
      : status === "offline"
        ? {
            dotColor: "#ef4444",
            glowColor: "rgba(239,68,68,0.4)",
            labelColor: "#f87171",
            label: "Status · offline",
            dotAnimation: "knot-pulse-slow 3s ease-in-out infinite",
            ringAnimation: "none",
          }
        : {
            dotColor: "#fbbf24",
            glowColor: "rgba(251,191,36,0.5)",
            labelColor: "#fcd34d",
            label: "Status · checking",
            dotAnimation: "knot-pulse-core 2s ease-in-out infinite",
            ringAnimation: "knot-pulse-ring 2s ease-in-out infinite",
          };

  return (
    <>
      <style>{`
        @keyframes knot-pulse-core {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes knot-pulse-ring {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes knot-pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes knot-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .knot-fade-1 { animation: knot-fade-up 0.5s ease both; }
        .knot-fade-2 { animation: knot-fade-up 0.5s 0.1s ease both; }
        .knot-fade-3 { animation: knot-fade-up 0.5s 0.2s ease both; }
        .knot-fade-4 { animation: knot-fade-up 0.5s 0.3s ease both; }
        .knot-fade-5 { animation: knot-fade-up 0.5s 0.4s ease both; }
        .knot-fade-6 { animation: knot-fade-up 0.5s 0.5s ease both; }
      `}</style>

      <div
        style={{
          fontFamily: "var(--font-bitter)",
          color: "#d1d5db",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
          overflowX: "hidden",
          backgroundColor: "#1e1b4b",
        }}
      >
        {/* Dot-grid background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "fixed",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(67,56,202,0.35) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Site bar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            background: "linear-gradient(to right, #1e1b4b, #312e81)",
            borderBottom: "1px solid rgba(99,102,241,0.2)",
            padding: "0.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <a
            href="https://smart-knowledge-systems.com"
            style={{
              color: "#c7d2fe",
              textDecoration: "none",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            smart-knowledge-systems.com
          </a>
          <span
            style={{
              color: "rgba(165,180,252,0.3)",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
            }}
          >
            /
          </span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              color: "rgba(199,210,254,0.5)",
            }}
          >
            knot
          </span>
        </div>

        {/* Main content */}
        <main
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 1.5rem 3rem",
            maxWidth: "680px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Status indicator */}
          <div
            className="knot-fade-1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "14px",
                height: "14px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: statusConfig.dotColor,
                  boxShadow: `0 0 8px 2px ${statusConfig.glowColor}`,
                  animation: statusConfig.dotAnimation,
                }}
              />
              {status === "checking" && (
                <div
                  style={{
                    position: "absolute",
                    inset: "-5px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(251,191,36,0.4)",
                    animation: statusConfig.ringAnimation,
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: statusConfig.labelColor,
              }}
            >
              {statusConfig.label}
            </span>
          </div>

          <h1
            className="knot-fade-2"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "0.5rem",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            The knot might be sleeping.
          </h1>

          <p
            className="knot-fade-2"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.8rem",
              color: "#818cf8",
              letterSpacing: "0.04em",
              marginBottom: "2rem",
            }}
          >
            knot.smart-knowledge-systems.com &nbsp;·&nbsp; ATProto git hosting
          </p>

          {/* Divider */}
          <div
            className="knot-fade-3"
            style={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(99,102,241,0.4), transparent)",
              marginBottom: "2rem",
            }}
          />

          {/* Body copy */}
          <p
            className="knot-fade-3"
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#9ca3af",
              marginBottom: "2rem",
              textAlign: "center",
              maxWidth: "520px",
            }}
          >
            This is a self-hosted{" "}
            <em style={{ color: "#d1d5db", fontStyle: "italic" }}>
              Tangled knot
            </em>{" "}
            — an ATProto-enabled git server running as a local Docker container.
            It lives on a personal laptop, which means it&apos;s only reachable
            when that machine is{" "}
            <em style={{ color: "#d1d5db", fontStyle: "italic" }}>
              powered on and connected
            </em>
            . No cloud. No always-on server. Just a laptop doing its best.
          </p>

          {/* Link rows */}
          <div
            className="knot-fade-4"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              width: "100%",
              marginBottom: "2.5rem",
            }}
          >
            {/* Try knot */}
            <LinkRow label="Try knot">
              <a
                role="link"
                onClick={handleTryKnot}
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.8rem",
                  color: "#c7d2fe",
                  textDecoration: "none",
                  wordBreak: "break-all",
                  transition: "color 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.textDecoration = "underline";
                  e.currentTarget.style.textUnderlineOffset = "3px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#c7d2fe";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {KNOT_URL}
              </a>
            </LinkRow>

            {/* Tangled profile */}
            <LinkRow label="Tangled">
              <a
                href={TANGLED_PROFILE}
                target="_blank"
                rel="noopener"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.8rem",
                  color: "#c7d2fe",
                  textDecoration: "none",
                  wordBreak: "break-all",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.textDecoration = "underline";
                  e.currentTarget.style.textUnderlineOffset = "3px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#c7d2fe";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {TANGLED_PROFILE}
              </a>
            </LinkRow>
          </div>

          {/* Code block */}
          <div
            className="knot-fade-5"
            style={{
              width: "100%",
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(99,102,241,0.15)",
              borderRadius: "8px",
              padding: "1rem 1.25rem",
              marginBottom: "2.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#818cf8",
                marginBottom: "0.5rem",
              }}
            >
              Clone when live
            </p>
            <code
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.78rem",
                color: "#d1d5db",
                display: "block",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              <span
                style={{ color: "rgba(165,180,252,0.5)", userSelect: "none" }}
              >
                ${" "}
              </span>
              <span style={{ color: "#fcd34d" }}>git clone</span>{" "}
              <span style={{ color: "#c7d2fe" }}>
                https://knot.smart-knowledge-systems.com/&lt;did&gt;/&lt;repo&gt;
              </span>
            </code>
          </div>

          {/* Footer note */}
          <p
            className="knot-fade-6"
            style={{
              fontSize: "0.8rem",
              color: "rgba(156,163,175,0.5)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Built with{" "}
            <FooterLink href="https://tangled.sh">Tangled</FooterLink> &amp;{" "}
            <FooterLink href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/">
              Cloudflare Tunnel
            </FooterLink>
            . Part of the{" "}
            <FooterLink href="https://atproto.com">AT Protocol</FooterLink>{" "}
            ecosystem.
          </p>
        </main>
      </div>
    </>
  );
}

function LinkRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: "8px",
        padding: "0.875rem 1.25rem",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#818cf8",
          whiteSpace: "nowrap",
          minWidth: "90px",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      style={{ color: "rgba(129,140,248,0.6)", textDecoration: "none" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "rgba(129,140,248,0.6)")
      }
    >
      {children}
    </a>
  );
}

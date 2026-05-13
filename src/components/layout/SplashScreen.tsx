/*

"use client";

import { useEffect, useState } from "react";
import { Box, Text } from "@mantine/core";
import { PageLogo } from "@/components/layout/PageLogo";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        transition: "opacity 0.5s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <Box style={{ animation: "splashPop 2.0s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
        <PageLogo />
      </Box>

      <Text size="sm" c="dimmed" style={{ animation: "splashFadeIn 0.6s ease 0.4s both" }}>
        Interní bazar pro spolupracovníky
      </Text>

      <Box style={{ display: "flex", gap: 6, animation: "splashFadeIn 0.6s ease 0.6s both" }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#FF5500",
              animation: `splashDot 1s ease ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </Box>

      <style>{`
        @keyframes splashPop {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashDot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}
  */
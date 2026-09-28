"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const FRAME_W = 288;
export const FRAME_H = 448;
export const FRAME_COUNT = 12;

export type SpriteWalkerHandle = {
  /** 0..1 progress → picks the frame. `cycles` = how many full walk loops across the range. */
  setProgress: (p: number, cycles?: number) => void;
  setFrame: (i: number) => void;
};

type Props = { className?: string; alt: string; sheet?: string };

// Canvas sprite: one 12-frame sheet, drawn at DPR. No DOM churn per frame.
export const SpriteWalker = forwardRef<SpriteWalkerHandle, Props>(function SpriteWalker(
  { className, alt, sheet = "/traveler/sheet.webp" },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef(-1);

  const draw = (i: number) => {
    const c = canvasRef.current;
    const img = imgRef.current;
    if (!c || !img || !img.complete) return;
    if (i === frameRef.current) return;
    frameRef.current = i;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, i * FRAME_W, 0, FRAME_W, FRAME_H, 0, 0, c.width, c.height);
  };

  useImperativeHandle(ref, () => ({
    setProgress: (p, cycles = 3) => {
      const clamped = Math.min(1, Math.max(0, p));
      const i = Math.floor(clamped * cycles * FRAME_COUNT) % FRAME_COUNT;
      draw(i);
    },
    setFrame: (i) => draw(((i % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT),
  }));

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = FRAME_W * dpr;
    c.height = FRAME_H * dpr;
    const img = new Image();
    img.decoding = "async";
    img.src = sheet;
    imgRef.current = img;
    img.onload = () => {
      frameRef.current = -1;
      draw(0);
    };
  }, [sheet]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }} />;
});

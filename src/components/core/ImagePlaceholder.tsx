import type { CSSProperties, ReactNode } from 'react';
import styles from './ImagePlaceholder.module.css';

export interface ImagePlaceholderProps {
  /** describe the intended photo: "foto · slavlje gola" */
  label?: string;
  ratio?: string;
  tone?: 'light' | 'dark' | 'accent';
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

/** Hatched stand-in for photography until real club photos are supplied. */
export function ImagePlaceholder({ label, ratio = '16/9', tone = 'light', style, className, children }: ImagePlaceholderProps) {
  return (
    <div
      className={`${styles.ph} ${styles[tone]} ${className ?? ''}`}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={label}
    >
      <span aria-hidden>{label}</span>
      {children}
    </div>
  );
}

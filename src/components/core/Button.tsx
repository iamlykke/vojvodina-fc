import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  /** primary = red CTA (one per view), inverse = white on red, outline / outline-inverse = secondary */
  variant?: 'primary' | 'inverse' | 'outline' | 'outline-inverse';
  size?: 's' | 'm';
  block?: boolean;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

/** Square, uppercase condensed-type button; primary for the single main CTA, outline for secondary actions. */
export function Button({ variant = 'primary', size = 'm', block = false, href, onClick, disabled, className, children }: ButtonProps) {
  const cls = [styles.button, styles[variant], size === 's' && styles.small, block && styles.block, className].filter(Boolean).join(' ');
  if (href && !disabled) {
    return <Link href={href} className={cls} onClick={onClick}>{children}</Link>;
  }
  return <button type="button" className={cls} onClick={onClick} disabled={disabled}>{children}</button>;
}

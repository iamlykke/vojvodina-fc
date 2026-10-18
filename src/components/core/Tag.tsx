import type { ReactNode } from 'react';
import styles from './Tag.module.css';

export interface TagProps {
  /** text = red category label in meta rows; solid = red block on photos; chip = hashtag */
  tone?: 'text' | 'solid' | 'chip';
  children?: ReactNode;
}

/** News category label (Prvi tim, Ulaznice, Akademija…). */
export function Tag({ tone = 'text', children }: TagProps) {
  return <span className={styles[tone]}>{children}</span>;
}

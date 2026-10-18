import Link from 'next/link';
import Image from 'next/image';
import { Tag } from '@/components/core/Tag';
import { ImagePlaceholder } from '@/components/core/ImagePlaceholder';
import styles from './NewsCard.module.css';

export interface NewsCardProps {
  /** lead = home main story; grid = 4-col archive; row = compact list beside lead; overlay = title on photo */
  layout?: 'lead' | 'grid' | 'row' | 'overlay';
  category: string;
  date: string;
  title: string;
  excerpt?: string;
  image?: string;
  imageLabel?: string;
  href?: string;
}

const RATIO = { lead: '16/9', grid: '4/3', row: '4/3', overlay: '16/9' } as const;

/** News teaser; the whole card is the link, the title underlines on hover. */
export function NewsCard({ layout = 'grid', category, date, title, excerpt, image, imageLabel = 'foto', href = '#' }: NewsCardProps) {
  const ratio = RATIO[layout];
  const media = image ? (
    <div className={styles.media} style={{ aspectRatio: ratio }}>
      <Image src={image} alt="" fill sizes={layout === 'row' ? '180px' : '(max-width: 900px) 100vw, 60vw'} />
    </div>
  ) : (
    <ImagePlaceholder ratio={ratio} label={imageLabel} className={styles.media} />
  );
  const meta = <div className={styles.meta}><Tag>{category}</Tag><time>{date}</time></div>;

  if (layout === 'overlay') {
    return (
      <Link href={href} className={`${styles.card} ${styles.overlay}`}>
        {media}
        <div className={styles.overlayText}>
          <Tag tone="solid">{category}</Tag>
          <h3 className={styles.title}>{title}</h3>
          <time className={styles.overlayDate}>{date}</time>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className={`${styles.card} ${styles[layout]}`}>
      {media}
      <div className={styles.body}>
        {meta}
        <h3 className={styles.title}>{title}</h3>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
      </div>
    </Link>
  );
}

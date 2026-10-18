import Link from 'next/link';
import Image from 'next/image';
import { ImagePlaceholder } from '@/components/core/ImagePlaceholder';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  name: string;
  /** "8.990 RSD" — dot thousands separator */
  price: string;
  /** "Novo" */
  tag?: string;
  image?: string;
  imageLabel?: string;
  href?: string;
}

/** Fan shop tile: square product image on white, name + price row. */
export function ProductCard({ name, price, tag, image, imageLabel = 'proizvod', href = '#' }: ProductCardProps) {
  return (
    <Link href={href} className={styles.card}>
      {image ? (
        <div className={styles.media}>
          <Image src={image} alt="" fill sizes="(max-width: 600px) 160px, 25vw" />
          {tag && <span className={styles.tag}>{tag}</span>}
        </div>
      ) : (
        <ImagePlaceholder ratio="1" label={imageLabel} className={styles.ph}>
          {tag && <span className={styles.tag}>{tag}</span>}
        </ImagePlaceholder>
      )}
      <div className={styles.body}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>{price}</span>
      </div>
    </Link>
  );
}

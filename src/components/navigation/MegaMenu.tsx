import Link from 'next/link';
import { ImagePlaceholder } from '@/components/core/ImagePlaceholder';
import type { NavGroupView } from '@/lib/nav';
import styles from './MegaMenu.module.css';

export interface MegaMenuProps {
  groups: NavGroupView[];
  /** index of the hovered top-level item (its column gets the red rule) */
  activeIndex?: number;
  promo?: { eyebrow: string; title: string; image: string; action: string; href: string };
}

/** One shared panel for all eight sections; columns map 1:1 to inner page templates. */
export function MegaMenu({ groups, activeIndex = -1, promo }: MegaMenuProps) {
  return (
    <div className={styles.menu}>
      <div className={styles.inner} data-promo={promo ? '' : undefined}>
        <div className={styles.columns}>
          {groups.map((g, k) => (
            <div key={g.href} data-col={k}>
              <div className={styles.title} data-active={k === activeIndex ? '' : undefined}>{g.label}</div>
              <ul>
                {g.items.map((it) => (
                  <li key={it.href}><Link href={it.href} className={styles.link}>{it.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {promo && (
          <div className={styles.promo}>
            <ImagePlaceholder ratio="4/3" tone="accent" label={promo.image} />
            <div className={styles.eyebrow}>{promo.eyebrow}</div>
            <div className={styles.promoTitle}>{promo.title}</div>
            <Link href={promo.href} className={styles.promoAction}>{promo.action}</Link>
          </div>
        )}
      </div>
    </div>
  );
}

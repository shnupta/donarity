import styles from './explore-tile.module.css'
import ArrowLink from './arrow-link'
import Image from 'next/image'
import Link from 'next/link';

export default function ExploreTile({ horizontal, charity, className }) {
  return (
    <Link href={"/charities/" + charity.id} >
      <a className={styles.anchor}>
        <div className={styles.tile + (horizontal ? " " + styles.horizontal : "") + (className ? " " + className : "")}>
          <div className={styles.imageContainer}>
            <Image src={charity.image} layout="fill" objectFit="cover" />
          </div>
          <div className={styles.blurb_container}>
            <h1>{charity.name}</h1>
            {horizontal && <h2>{charity.tagline}</h2>}
            {!horizontal && <p>{charity.tagline}</p>}
            {horizontal && <p>{charity.description}</p>}
            <div className={styles.footer}>
              <ArrowLink className={styles.seeMore} noAnchor right href={"/charities/" + charity.id}>See more</ArrowLink>
              <p className={styles.subscriptionNumber}>{charity.subscriptions.length} active donor{charity.subscriptions.length != 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
    
  )
}
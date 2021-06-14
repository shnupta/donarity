import styles from './explore-tile.module.css'
import ArrowLink from './arrow-link'
import Image from 'next/image'

export default function ExploreTile({ width, height, horizontal, charity }) {
  return (
    <div className={styles.tile + (horizontal ? " " + styles.horizontal : "")} style={{width: width, height: height}}>
      <div className={styles.imageContainer}>
        <Image src={charity.image} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.blurb_container}>
        <h1>{charity.name}</h1>
        {horizontal && <h2>{charity.tagline}</h2>}
        {!horizontal && <p>{charity.tagline}</p>}
        {horizontal && <p>{charity.description}</p>}
        <ArrowLink right href={"/charities/" + charity.id}>See more</ArrowLink>
      </div>
    </div>
  )
}
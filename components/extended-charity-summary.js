import styles from './extended-charity-summary.module.css'
import PageTitle from "./page-title";
import Subtitle from "./subtitle";
import ArrowLink from "./arrow-link"

export default function ExtendedCharitySummary({ className, charity }) {
  return (
    <div className={className}>
      <div className={styles.charityHeader}>
        <div className={styles.mainInfo}>
          <PageTitle>{charity.name}</PageTitle>
          <Subtitle>{charity.tagline}</Subtitle>
        </div>
        <div className={styles.category}>
          <h3>Category</h3>
          <p>{charity.category.name}</p>
        </div>
      </div>
      <div className={styles.links}>
        <ArrowLink className={styles.website} href={charity.website}>{charity.website}</ArrowLink>
        <div>
          {charity.facebook && <a className={styles.social} href={charity.facebook}><img src="/socials/facebook.svg" /></a>}
          {charity.twitter && <a className={styles.social} href={charity.twitter}><img src="/socials/twitter.svg" /></a>}
          {charity.instagram && <a className={styles.social} href={charity.instagram}><img src="/socials/instagram.svg" /></a>}
          {charity.linkedin && <a className={styles.social} href={charity.linkedin}><img src="/socials/linkedin.svg" /></a>}
        </div>
      </div>
      <div className={styles.description}>
        {charity.description.split("\n").map((paragraph, key) => {
          return <p key={key}>{paragraph}</p>
        })}
      </div>
    </div>

  )
}
import styles from './charity-summary.module.css'
import ArrowLink from './arrow-link'

export default function CharitySummary({ className, charity }) {
  return (
    <div className={className}>
      <div className={styles.charityHeader}>
        <h1 className={styles.charityName}>{charity.name}</h1>
        <img className={styles.logo} src={charity.image} />
      </div>
      <p className={styles.description}>{charity.description}</p>
      <ArrowLink href={"/charities/" + charity.id}>Find out more</ArrowLink>
    </div>
  )
}
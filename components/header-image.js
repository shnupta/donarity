import styles from './header-image.module.css'
import Image from 'next/image'

export default function HeaderImage({ src, className }) {
  return (
    <div className={styles.headerImage + (className ? " " + className : "")}>
      <Image src={src} alt="Charity Header Image" layout="fill" objectFit="cover" />
    </div>
  )
}
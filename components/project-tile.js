import styles from './project-tile.module.css'
import Image from 'next/image'
import Link from 'next/link';
import Button from './button';

export default function ProjectTile({ project, className }) {
  return (
    <div className={styles.tile + (className ? " " + className : "")}>
      <div className={styles.imageContainer}>
        <Image src={project.image} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.blurb_container}>
        <h1>{project.name}</h1>
        {project.description.split("\n").map((paragraph, key) => {
          return <p key={key}>{paragraph}</p>
        })}
        <div className={styles.footer}>
          <Link href={"/donate/" + project.charity.id}>
            <a>
              <Button white>Contribute</Button>
            </a>
          </Link>
          {project.link &&
            <a href={project.link}>
              <img className={styles.link} src="/share.svg" />
            </a>
          }
        </div>
      </div>
    </div>
    
  )
}
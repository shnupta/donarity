import styles from './explore-tile.module.css'

export default function ExploreTile({ children, img, charityPage, width, height, horizontal }) {
    return (
        <div className={styles.tile + (horizontal ? " " + styles.horizontal : "")} style={{width: width, height: height}}>
            <img src={img} />
            <div className={styles.blurb_container}>
                {children}
            </div>
        </div>
    )
}
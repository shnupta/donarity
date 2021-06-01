import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './feed-tile.module.css'

export default function FeedTile({children, title, img, charityPage, width, height}) {
    return (
        <Card className={styles.tile}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            {children}
            </Card.Text>
            <Button className={styles.button}>See more</Button>
        </Card.Body>
        </Card>
    )
}
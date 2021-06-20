import styles from "components/card-tile.module.css"
import Col from 'react-bootstrap/Col'

export default function CardTile({card}) {
    return (
        <div className={styles.tile}>
            <div className={styles.row}>
                <Col md={3}><h1>{(card.card.brand).toUpperCase()}</h1></Col>
                <Col><h1><span className={styles.grey}>Ending in:</span>  {card.card.last4}</h1></Col>
                <Col><h1><span className={styles.grey}>Expires:</span>  {card.card.exp_month + "/" + card.card.exp_year}</h1></Col>
            </div>
        </div>
    );
}
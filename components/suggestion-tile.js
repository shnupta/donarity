import styles from 'components/suggestion-tile.module.css';

import Col from 'react-bootstrap/Col'
import ArrowLink from './arrow-link'

export default function SuggestionTile({name, img, charityId}) {

    return (
        <div className={styles.tile}>
            <div className={styles.row}>
                <Col><img src={img} alt={name}/></Col>
                <Col><h1>{name}</h1></Col>
                <Col><ArrowLink className={styles.arrow} right href={"/charities/" + charityId}>Read more</ArrowLink></Col>
            </div>
        </div>
    );
}
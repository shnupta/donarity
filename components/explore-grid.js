import { connectHits } from 'react-instantsearch-dom';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import ExploreTile from "../components/explore-tile";
import styles from "./explore-grid.module.css";


const Hits = ({ hits, charities }) => {
  const matchingCharities = hits.map((hit) => charities.find(charity => charity.id === hit.objectID));
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 700: 2, 1100: 3}}>
      <Masonry gutter={"100px"}>
        {matchingCharities.map((charity) => {
          if (charity != undefined) {
            return <ExploreTile key={charity.id} charity={charity} className={styles.exploreTile} />
          }
        } 
        )}
      </Masonry>
    </ResponsiveMasonry>
    
  )
};

const ExploreGrid = connectHits(Hits);

export default ExploreGrid;
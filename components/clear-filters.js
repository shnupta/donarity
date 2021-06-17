import styles from './clear-filters.module.css';
import Button from './button';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

const MyClearFilters = ({ items, refine, className }) => {
  return (
    <Button className={className} onClick={() => refine(items)} disabled={!items.length}>Clear Filters</Button>
  )
}

const ClearFilters = connectCurrentRefinements(MyClearFilters);
export default ClearFilters;
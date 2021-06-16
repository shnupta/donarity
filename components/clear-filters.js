import styles from './clear-filters.module.css';
import Button from './button';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

const MyClearFilters = ({ items, refine }) => {
  return (
    <Button onClick={() => refine(items)} disabled={!items.length}>Clear Filters</Button>
  )
}

const ClearFilters = connectCurrentRefinements(MyClearFilters);
export default ClearFilters;
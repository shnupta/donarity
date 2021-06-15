import { connectSearchBox } from 'react-instantsearch-dom';
import TextInput from './text-input';
import styles from "./explore-grid.module.css";


const SearchBox = ({ refine, className }) => {
  return (
    <TextInput className={className} icon="/search.svg" active placeholder="search" onChange={refine} onFocus={() => {}} />
    
  )
};

const SearchInput = connectSearchBox(SearchBox);

export default SearchInput;
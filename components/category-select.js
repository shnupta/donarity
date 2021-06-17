import styles from './category-select.module.css';
import { connectRefinementList } from 'react-instantsearch-dom';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import CheckBox from './checkbox';
import React from 'react';
import { StylesProvider } from '@material-ui/styles';

function MyCategorySelect({ className, items, refine, currentRefinement }) {

  const getItemsFromRefinement = refinement => {
    return items.filter(item => refinement.includes(item.label));
  }

  const handleChange = (event, newValue) => {
    refine(newValue.map(item => item.label));
  }

  return (
    <div className={className ? " " + className : ""}>
      <Autocomplete
        fullWidth={false}
        multiple
        limitTags={2}
        options={items}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, value) => option.label === value.label}
        value={getItemsFromRefinement(currentRefinement)}
        onChange={handleChange}
        renderOption={(option, { selected }) => (
          <div>
            <CheckBox checked={selected} name={option.label} onClick={() => {}} />
          </div>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Categories" placeholder=""
            InputLabelProps={{
              classes: {
                shrink: styles.shrink,
              }
            }} 
          />
        )}
        classes={{
          root: styles.root,
          focused: styles.focused,
        }}
      />
    </div>
  )
}

const CategorySelect = connectRefinementList(MyCategorySelect);
export default CategorySelect;
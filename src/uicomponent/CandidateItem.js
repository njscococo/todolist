import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    flexDiv:{
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        margin: '15px 2px',
    },
    input: {
        display: 'none',
    },
};
function CandidateItem(props) {
    const [itemtName, setItemName] = useState('')

    return (
        <div style={styles.flexDiv}>
            <TextField
                id="candidateItem"
                label="Project Name"
                //className={styles.button}
                value={itemtName}
                onChange={(evt) => {
                    //console.log(itemtName)
                    setItemName(evt.target.value);
                }}
                margin="normal"
                variant="outlined"
            />
            <Button variant="contained" color="primary" style={styles.button}
                onClick={() => {
                    props.addItem({
                        projectName: itemtName,
                        //todoItems: [{ label: '', detail: '' }]
                    });
                    setItemName('');
                }}
            >
                <AddCircleIcon style={{ marginRight: 5 }} />
                Add
            </Button>
            <Button variant="contained" color="secondary" style={styles.button}
                onClick={() => props.isOpen()}
            >
                <DeleteIcon style={{ marginRight: 5 }} />
                Cancel
            </Button>
        </div>
    )
}

CandidateItem.propTypes = {
    items: PropTypes.array,
    isOpen: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired

}

export default CandidateItem;
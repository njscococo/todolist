import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    flexDiv: {
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
    const { selectedItem } = props
    const [itemtName, setItemName] = useState('')
    const [detail, setDetail] = useState('')

    return (
        <div style={props.isFlex ? styles.flexDiv : null}>
            <div style={styles.flexDiv}>
                <TextField
                    id="candidateItem"
                    label={selectedItem ? "Task Name" : "Project Name"}
                    //className={styles.button}
                    value={itemtName}
                    onChange={(evt) => {
                        //console.log(itemtName)
                        setItemName(evt.target.value);
                    }}
                    margin="normal"
                    variant="outlined"
                />
                {props.isFlex ? <TextField
                    id="div_detail"
                    label="Detail"
                    //className={styles.button}
                    value={itemtName}
                    onChange={(evt) => {
                        //console.log(itemtName)
                        setItemName(evt.target.value);
                    }}
                    margin="normal"
                    variant="outlined"
                /> : null}

            </div>
            <Button variant="contained" color="primary" style={styles.button}
                onClick={() => {
                    //console.log('selectedItem',props.selectedItem)
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
    isFlex: PropTypes.bool.isRequired,
    items: PropTypes.array,
    isOpen: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired

}

CandidateItem.defaultProps = {
    isFlex: false
}

export default CandidateItem;
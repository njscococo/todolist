import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
};

function SearchBar(props) {
    const { classes, filterItem } = props;
    const [searchText, setSearchText] = useState('');

    return (
        <div>
            <Paper className={classes.root} elevation={1} style={{ marginBottom: 5 }}>
                <InputBase className={classes.input} placeholder="Search Todo Items" onChange={(evt) => {
                    //console.log('search', evt.target.value, project);
                    setSearchText(evt.target.value);
                    filterItem(evt.target.value);
                }} />
                <IconButton className={classes.iconButton} aria-label="Search"
                    onClick={() => {
                        filterItem(searchText)
                    }}
                >
                    <SearchIcon />
                </IconButton>

            </Paper>
        </div>
    );
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);

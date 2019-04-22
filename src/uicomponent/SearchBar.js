import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240
const styles = theme => ({
    root: {        
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    input: {
        marginLeft: 8,
        //flexGrow: 2,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: 1

        }
    },
    SearchBar: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            flexDirection: 'row'
        },

        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column'
        }
    }
});

function SearchBar(props) {
    const { classes, filterItem } = props;
    const [searchText, setSearchText] = useState('');
    const [itemStatus, setItemStatus] = useState('all')

    return (
        <div>
            <Paper className={classes.root} elevation={1} style={{ marginBottom: 5 }}>
                <div className={classes.SearchBar}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <InputBase className={classes.input} placeholder="Search Todo Items" fullWidth={true}
                        onChange={(evt) => {
                            //console.log('search', evt.target.value, project);
                            setSearchText(evt.target.value);
                            filterItem(evt, evt.target.value);
                        }} />
                        <IconButton className={classes.iconButton} aria-label="Search"
                            onClick={(evt) => {
                                filterItem(evt, searchText)
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </div>

                    <Divider className={classes.divider} />
                    <RadioGroup
                        name="itemFilter"
                        style={{ display: 'flex', flexDirection: 'row', marginLeft: '8px' }}
                        //className={classes.group}
                        value={itemStatus}
                        onChange={(evt) => {
                            setItemStatus(evt.target.value)
                            filterItem(evt, evt.target.value)
                        }}
                    >
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="done" control={<Radio />} label="Done" />
                        <FormControlLabel value="undone" control={<Radio />} label="Undone" />
                    </RadioGroup>
                </div>
            </Paper>
        </div>
    );
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);

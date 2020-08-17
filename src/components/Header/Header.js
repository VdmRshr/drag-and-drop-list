import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import PropTypes from "prop-types";

const Header = ({onItemAdded}) => {
    const [open, setOpen] = React.useState(false);
    const [newItem, setNewItem] = React.useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setSuccess(false);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onChange = (e) => {
        setNewItem(e.target.value);
        setErrors({})
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(newItem);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            onItemAdded(newItem);
            setNewItem('');
            setSuccess(true);
            handleClose();
        }

    };

    const validateForm = (data) => {
        let errors = {};
        if (!data) errors.newItem = 'This field must not be empty';
        return errors
    };


    return (
        <AppBar position="static">
            <Toolbar>
                <Box flexGrow='1' display='flex'>
                    <Typography variant='h6'>Drag'n'Drop List</Typography>
                </Box>
                <IconButton onClick={handleClickOpen}>
                    <PlaylistAddIcon htmlColor='#ffffff'/>
                </IconButton>
            </Toolbar>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align='center'>Add New Item</DialogTitle>
                <DialogContent>
                    {success && <Alert severity="success">Success! You have added a new item!</Alert>}
                    <form onSubmit={onSubmit} noValidate>
                        <TextField
                            label="New Item"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={newItem}
                            onChange={onChange}
                            error={errors.newItem ? true : false}
                            helperText={errors.newItem}
                        />
                        <Box align='center' mt={2}>
                            <IconButton type='submit'>
                                <AddCircleIcon htmlColor='#3f51b5' fontSize='large'/>
                            </IconButton>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </AppBar>
    );
};
Header.propTypes = {
    onItemAdded: PropTypes.func.isRequired

};

export default Header;
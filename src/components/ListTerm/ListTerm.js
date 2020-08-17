import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import PropTypes from "prop-types";

const ListTerm = ({item, idx, onDelete, onUpdateItem, onDragStartHandler, onDragEndHandler, onDragOverHandler}) => {
    const [edit, setEdit] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [dropped, setDropped] = useState(false);
    const onEdit = () => {
        setEdit(true);
        setInputValue(item.text)
    };
    const onChange = (e) => {
        setInputValue(e.target.value)
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            editHandler()
        }
    };

    const editHandler = () => {
        onUpdateItem(item.id, inputValue);
        setEdit(false)
    }

    const onDragStart = (e) => {
        setDropped(true);
        onDragStartHandler(e, idx)
    };
    const onDragEnd = () => {
        setDropped(false);
        onDragEndHandler()
    };
    const onDragOver = (e) => {
        onDragOverHandler(e, idx)
    };

    return (
        <ListItem button onDoubleClick={onEdit}
                  onDragOver={onDragOver}
                  style={{background: `${dropped ? 'grey' : 'inherit'}`}}

        >
            {edit ?
                <TextField
                    autoFocus
                    value={inputValue}
                    type='text'
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                    tabIndex='0'
                    onBlur={editHandler}
                />
                :
                <>
                    <ListItemIcon style={{cursor: 'grab'}}
                                  draggable={true}
                                  onDragStart={onDragStart}
                                  onDragEnd={onDragEnd}
                    >
                        <DragHandleIcon/>
                    </ListItemIcon>
                    <ListItemText primary={item.text}/>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </>
            }
        </ListItem>
    );
};

ListTerm.propTypes = {
    item: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDragStartHandler: PropTypes.func.isRequired,
    onDragEndHandler: PropTypes.func.isRequired,
    onDragOverHandler: PropTypes.func.isRequired
};

export default ListTerm;
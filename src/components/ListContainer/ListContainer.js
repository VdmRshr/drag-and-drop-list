import React from 'react';
import List from '@material-ui/core/List';
import Box from "@material-ui/core/Box";
import ListTerm from "../ListTerm";
import PropTypes from "prop-types";

const ListContainer = ({list, onDelete, onUpdateItem, onDragStartHandler, onDragEndHandler, onDragOverHandler}) => {

    const elements = list.map((item, idx) => {
        return (
            <ListTerm key={item.id}
                      idx={idx}
                      item={item}
                      onDelete={() => onDelete(item.id)}
                      onUpdateItem={onUpdateItem}
                      onDragStartHandler={onDragStartHandler}
                      onDragEndHandler={onDragEndHandler}
                      onDragOverHandler={onDragOverHandler}
            />
        )
    });
    return (
        <Box minHeight='31rem' mb={4}>
            <List onDragOver={(e) => e.preventDefault}>
                {elements}
            </List>
        </Box>
    );
};
ListContainer.propTypes = {
    list: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDragStartHandler: PropTypes.func.isRequired,
    onDragEndHandler: PropTypes.func.isRequired,
    onDragOverHandler: PropTypes.func.isRequired
};
export default ListContainer;
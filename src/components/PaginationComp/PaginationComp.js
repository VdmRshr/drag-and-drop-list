import React, {useState} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    paginationUL: {
        justifyContent: "center"
    }
});

const PaginationComp = ({itemsPerPage, totalItems, paginate}) => {
    const classes = useStyles();

    const [page, setPage] = useState(1);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }
    const handleChange = (event, value) => {
        setPage(value);
        paginate(value)
    };

    return (
        <Pagination count={pageNumbers.length}
                    color="primary"
                    page={page}
                    onChange={handleChange}
                    classes={{ul: classes.paginationUL}}
        />

    );
};

export default PaginationComp;
import React, {useState, useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Header from "../Header";
import List from "../ListContainer";
import PaginationComp from "../PaginationComp";


const App = () => {
    const [listItems, setListItems] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
            if (localStorage.getItem('listItems') === null) {
                const list = generateList()
                setListItems(list);
                localStorage.setItem('listItems', JSON.stringify(list));
            } else {
                setListItems(JSON.parse(localStorage.getItem('listItems')))
            }
        }, []
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listItems.slice(indexOfFirstItem, indexOfLastItem);

    const generateList = () => {
        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push({id: `item-${i}`, text: `Random text #${i + 1}`})
        }
        return data
    };

    const findIndex = (arr, id) => {
        return arr.findIndex((el) => el.id === id);
    };
    const updateList = (arr) => {
        setListItems(arr);
        localStorage.setItem('listItems', JSON.stringify(arr));
    };

    const deleteItem = (id) => {
        const idx = findIndex(listItems, id);
        const before = listItems.slice(0, idx);
        const after = listItems.slice(idx + 1);
        const newList = [...before, ...after];
        updateList(newList)
    };
    const addItem = (text) => {
        const item = {
            id: 1 + Math.random(),
            text: text,
        };
        const newList = [
            ...listItems,
            item
        ];
        updateList(newList)
    };
    const updateItem = (id, text) => {
        const idx = findIndex(listItems, id);
        const oldItem = listItems[idx];
        const newItem = {...oldItem, text};
        const newList = [
            ...listItems.slice(0, idx),
            newItem,
            ...listItems.slice(idx + 1)
        ];
        updateList(newList)
    };
    const onDragStartHandler = (e, index) => {
        setDraggedItem(listItems[index]);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    const onDragOverHandler = (e, index) => {
        e.preventDefault();
        const draggedOverItem = listItems[index];
        if (draggedItem === draggedOverItem) {
            return;
        }
        let sortItems = listItems.filter(item => item !== draggedItem);
        sortItems.splice(index, 0, draggedItem);
        updateList(sortItems);
    };

    const onDragEndHandler = () => {
        setDraggedItem(null)
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <Container>
            <Header onItemAdded={addItem}/>
            <List list={currentItems}
                  onDelete={deleteItem}
                  onUpdateItem={updateItem}
                  onDragStartHandler={onDragStartHandler}
                  onDragEndHandler={onDragEndHandler}
                  onDragOverHandler={onDragOverHandler}
            />
            <PaginationComp
                itemsPerPage={itemsPerPage}
                totalItems={listItems.length}
                paginate={paginate}/>
        </Container>
    );
}

export default App;

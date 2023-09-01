import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {CreateOutlined, DeleteOutlineOutlined} from "@mui/icons-material";
import React, {useState} from "react";
import {router} from "@inertiajs/react";
import axios from "axios";
import DialogUi from "../../../Components/DialogUi.jsx";

const PassMemList = ({passMems, setPassMems}) => {
    const [open, setOpen] = useState(false);
    const [selectedForDeletingItem, setSelectedForDeletingItem] = useState();
    const goToPassMem = (id) => {
        router.get(`/pass-mem/${id}`)
    }

    const handleDeleteTask = (id) => {
        axios.delete(`/pass-mem/${id}`)
        const updatedTasks = passMems.filter((passMem) => passMem.id !== id);
        setPassMems(updatedTasks);
    };

    const handleUpdateTask = (index) => {
        alert('Скоро будет обновить')
    };

    return (<>
        <List style={{marginTop: '20px'}}>
            {passMems.map((task) => (
                <ListItem key={task.id} onClick={() => {
                    goToPassMem(task.id)
                }}>
                    <ListItemText primary={task.title}/>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="update" onClick={() => handleUpdateTask(task.id)}>
                            <CreateOutlined/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => setOpen(true) || setSelectedForDeletingItem(task)}>
                            <DeleteOutlineOutlined/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>

        <DialogUi
            isOpenedDialog={open}
            title={`Are you sure to delete - ${selectedForDeletingItem?.title}?`}
            body="This action cannot be reverted"
            handleAgree={() => handleDeleteTask(selectedForDeletingItem.id) || setOpen(false)}
            handleClose={() => setOpen(false)}
        />
    </>);
}

export default PassMemList;

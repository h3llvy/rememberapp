import React, {useState} from 'react';
import {Button, TextField,} from '@mui/material';
import {ArrowBack, DeleteForever, SearchOutlined} from "@mui/icons-material";
import axios from "axios";
import {router} from "@inertiajs/react";


const ShowPage = ({passMem}) => {
    const [password, setPassword] = useState('');
    const handleInput = ({target:{value}}) => {
        setPassword(value);
    }

    const handleCheck = () => {
        axios.post(`/pass-mem/check/${passMem.id}`, {password: password})
            .then(({data: {isEqualed}}) => {
                if (isEqualed) {
                    console.log('Password match!');
                    alert('Password match!');
                } else {
                    console.log('Password does not match.');
                    alert('Password does not match.');
                }
            })
    };

    const handleDelete = () => {
        axios.delete(`/pass-mem/${passMem.id}`)
        router.get(`/pass-mem/`)
    };

    return (<div>
        <h1>title: {passMem.title}</h1>
        <TextField
            type="password"
            label="Password"
            variant="outlined"
            onChange={handleInput}
            onKeyDown={(e) => (e.key === 'Enter') && handleCheck()}
            value={password}
            fullWidth
        />
        <Button
            fullWidth
            variant="contained"
            color="warning"
            startIcon={<SearchOutlined/>}
            style={{marginTop: '10px'}}
            onClick={handleCheck}
        >
            Check
        </Button>
        <Button
            fullWidth
            color="error"
            startIcon={<DeleteForever/>}
            style={{marginTop: '10px'}}
            onClick={handleDelete}
        >
            Delete PassMem
        </Button>
        <Button
            fullWidth
            startIcon={<ArrowBack/>}
            style={{marginTop: '100px'}}
            onClick={() => router.get('/pass-mem')}
        >
            return to list
        </Button>
    </div>);
};

export default ShowPage;

import {Button, TextField} from "@mui/material";
import {AddCircleOutlineOutlined} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import axios from "axios";

const PassMemForm = ({setPassMems, passMems}) => {
    const [passMemForm, setPassMemForm] = useState({
        title: {value: "", error: ""},
        password: {value: "", error: ""},
        verifyPassword: {value: "", error: ""},
    })


    const [isOpenedDialog, setIsOpenedDialog] = React.useState(false);
    const handleClickOpen = () => {
        setIsOpenedDialog(true);
    };

    const handleClose = () => {
        setIsOpenedDialog(false);
    };

    const handleAgree = () => {
        handleClose()
        addPassMem()
    }

    useEffect(() => {
        if (passMemForm.password.value.length < 8) {
            setPassMemForm(form => ({
                ...form,
                password: {
                    ...form.password,
                    error: 'Pass must be 8 or more symbols'
                }
            }))
        } else {
            setPassMemForm(form => ({
                ...form,
                password: {
                    ...form.password,
                    error: null
                }
            }))
        }

        if (passMemForm.password.value !== passMemForm.verifyPassword.value || passMemForm.password.value.length === 0) {
            setPassMemForm(form => ({
                ...form,
                verifyPassword: {
                    ...form.verifyPassword,
                    error: 'Passwords not equals'
                }
            }))
        } else {
            setPassMemForm(form => ({
                ...form,
                verifyPassword: {
                    ...form.verifyPassword,
                    error: null
                }
            }))
        }

    }, [passMemForm]);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value

        setPassMemForm(form => ({
            ...form,
            [key]: {...form[key], value: value}
        }))
    }

    const addPassMem = () => {
        axios.post('/', {
            title: passMemForm.title.value,
            password: passMemForm.password.value
        })
            .then(({data}) => {
                setPassMems([data, ...passMems]);
                setPassMemForm({
                    title: {value: "", error: ""},
                    password: {value: "", error: ""},
                    verifyPassword: {value: "", error: ""},
                })
            })
    }

    return (<>
            <TextField
                id="title"
                label="Title"
                variant="outlined"
                fullWidth
                value={passMemForm.title.value}
                onChange={handleChange}
                error={!!passMemForm.title.error}
                helperText={passMemForm.title?.error}
            />
            <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={passMemForm.password.value}
                onChange={handleChange}
                style={{marginTop: '10px'}}
                error={!!passMemForm.password.error}
                helperText={passMemForm.password?.error}
            />
            <TextField
                id="verifyPassword"
                type="password"
                label="Again Password"
                variant="outlined"
                fullWidth
                value={passMemForm.verifyPassword.value}
                onChange={handleChange}
                style={{marginTop: '10px'}}
                error={!!passMemForm.verifyPassword.error}
                helperText={passMemForm.verifyPassword?.error}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineOutlined/>}
                style={{marginTop: '10px'}}
                onClick={addPassMem}
            >
                Add
            </Button>
        </>
    )

}

export default PassMemForm

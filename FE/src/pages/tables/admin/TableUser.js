import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import { axios } from '../../../service/service';
// Date Picker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Slide, TextField, InputLabel, MenuItem, FormControl, Select
} from '@mui/material';

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Tables() {
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const getUsers = async () => {
        const response = await axios.get("login/users/").catch((err) => console.log("error", err))

        if (response && response.data) {
            setUsers(response.data)
            console.log("data user")
            console.log(users)
        }
    }
    const rows = users.map((i) => {
        return {
            id: i.id,
            name: i.name,
            email: i.email,
            password: i.password,
            u_level: i.u_level == 2? "Admin" : "Kasier",
            ref: <Grid container><Grid item lg={6}><PopUpDeleteData idUsers={i.id} /></Grid><Grid item lg={6}><PopupEditData idUsers={i.id} /></Grid></Grid>
        };
    });

    const columns = [
        {
            label: "ID User",
            name: "id",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Name",
            name: "name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Email",
            name: "email",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Password",
            name: "password",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "User Level",
            name: "u_level",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Action",
            name: "ref",
            style: {}
        }
    ];

    useEffect(() => {
        getUsers();
    }, [])
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} xl={12}>
                    <Grid container>
                        <Grid item xl={6} lg={6}>
                            <PageTitle title="Table User" />
                        </Grid>
                        <Grid item xl={6} lg={6}>
                            <PopUpTambahData />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Data User"
                        data={rows}
                        columns={columns}
                        options={{
                            filterType: "checkbox",
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PopUpTambahData() {
    const [open, setOpen] = React.useState(false);
    const [getId, setId] = useState();
    const [getName, setName] = useState();
    const [getEmail, setEmail] = useState();
    const [getPassword, setPassword] = useState();
    const [getConfPassword, setConfPassword] = useState();
    const [getUlevel, setUlevel] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const tambahData = () => {
        axios.post("/login/users", {
            id: getId,
            name: getName,
            email: getEmail,
            password: getPassword,
            confPassword: getConfPassword,
            u_level: getUlevel
        }).then((response) => {
            console.log(response);
            window.location.reload();
            setOpen(false);
        }).catch((err) => console.log("error", err))
    }
    return (
        <div>
            <IconButton style={{ float: 'right', marginTop: 35 }} color="primary" onClick={handleClickOpen}>
                <AddCircleRoundedIcon fontSize="large" />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Tambah Data User"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <TextField style={{ marginTop: 10 }} onChange={e => setId(e.target.value)} fullWidth type="text" id="id" label="ID" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setName(e.target.value)} fullWidth type="text" id="name" label="Name" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setEmail(e.target.value)} fullWidth type="text" id="email" label="Email" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setPassword(e.target.value)} fullWidth type="text" id="password" label="Password" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setConfPassword(e.target.value)} fullWidth type="text" id="confPassword" label="Confirm Password" variant="outlined" />
                    <FormControl fullWidth style={{ marginTop: 10 }}>
                    <InputLabel id="u_level">User Level</InputLabel>
                        <Select
                            labelId="u_level"
                            id="u_level"
                            value={1}
                            label="User Level"
                            onChange={e => setUlevel(e.target.value)}
                        >
                            <MenuItem value={"1"}>Kasier</MenuItem>
                            <MenuItem value={"2"}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Batal</Button>
                    <Button onClick={tambahData}>Selesai</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function PopupEditData(props) {
    const idUsers = props.idUsers;
    const [open, setOpen] = React.useState(false);
    const [getId, setId] = useState();
    const [getName, setName] = useState();
    const [getEmail, setEmail] = useState();
    const [getPassword, setPassword] = useState();
    const [getConfPassword, setConfPassword] = useState();
    const [getUlevel, setUlevel] = useState();

    const editData = (e) => {
        axios.patch(`/login/update/${idUsers}`,
            {
                name: getName,
                email: getEmail,
                password: getPassword,
                confPassword: getConfPassword,
                u_level: getUlevel
            }).then((response) => {
                console.log(response);
                window.location.reload();
                setOpen(false);
            }).catch((err) => console.log("error", err))
    }

    const getOrderById = async () => {
        const response = await axios.get(`/login/user/${idUsers}`).catch((err) => console.log("error", err))

        if (response && response.data) {
            setId(response.data.id)
            setName(response.data.name)
            setEmail(response.data.email)
            setPassword(response.data.password)
            setConfPassword(response.data.password)
            setUlevel(response.data.u_level)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getOrderById();
    }, [])
    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                <EditRoundedIcon fontSize="medium" />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Edit Data Order"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                <TextField style={{ marginTop: 10 }} defaultValue={idUsers} fullWidth type="text" id="id" label="ID" InputProps={{ readOnly: true }} variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getName} onChange={e => setName(e.target.value)} autoFocus={true} fullWidth type="text" id="name" label="Name" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getEmail} onChange={e => setEmail(e.target.value)} autoFocus={true} fullWidth type="text" id="email" label="Email" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getPassword} onChange={e => setPassword(e.target.value)} autoFocus={true} fullWidth type="text" id="password" label="Password" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getConfPassword} onChange={e => setConfPassword(e.target.value)} autoFocus={true} fullWidth type="text" id="confPassword" label="Confirm Password" variant="outlined" />
                    <FormControl fullWidth style={{ marginTop: 10 }}>
                        <InputLabel id="u_level">User Level</InputLabel>
                        <Select
                            labelId="u_level"
                            id="u_level"
                            value={1}
                            label="User Level"
                            onChange={e => setUlevel(e.target.value)}
                        >
                            <MenuItem value={"1"}>Kasier</MenuItem>
                            <MenuItem value={"2"}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Batal</Button>
                    <Button onClick={editData}>Selesai</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function PopUpDeleteData(props) {
    const [open, setOpen] = React.useState(false);
    const idUsers = props.idUsers;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const hapusData = (e) => {
        axios.delete(`login/delete/${idUsers}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setOpen(false);
                window.location.reload();
            })
    }
    return (
        <div>
            <IconButton color="primary" style={{ float: 'left' }} onClick={handleClickOpen}>
                <DeleteRoundedIcon fontSize="medium" />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Apakah anda yakin ingin menghapus data user dengan id {idUsers}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Tidak</Button>
                    <Button onClick={hapusData}>Iya</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
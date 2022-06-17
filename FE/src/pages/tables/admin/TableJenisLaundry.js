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
// data
import mock from "../../dashboard/mock";
// POP UP
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Slide, TextField
} from '@mui/material';


const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Tables() {
    const [jenislaundry, setJenisLaundry] = useState([]);
    const classes = useStyles();
    const getJenisLaundry = async () => {
        const response = await axios.get("/jenislaundry/").catch((err) => console.log("error", err))

        if (response && response.data) {
            setJenisLaundry(response.data)
            console.log(jenislaundry)
        }
    }
    const rows = jenislaundry.map((i) => {
        return {
            id_jenislaundry: i.id_jenislaundry,
            jenis_laundry: i.jenis_laundry,
            harga: i.harga,
            ref: <Grid container><Grid item lg={6}><PopUpDeleteData idJenisLaundry={i.id_jenislaundry} /></Grid><Grid item lg={6}><PopupEditData idJenisLaundry={i.id_jenislaundry} /></Grid></Grid>
        };
    });

    const columns = [
        {
            label: "ID JenisLaundry",
            name: "id_jenislaundry",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Jenis Laundry",
            name: "jenis_laundry",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Harga",
            name: "harga",
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
        getJenisLaundry();
    }, [])
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} xl={12}>
                    <Grid container>
                        <Grid item xl={6} lg={6}>
                            <PageTitle title="Table Jenis Laundry" />
                        </Grid>
                        <Grid item xl={6} lg={6}>
                            <PopUpTambahData />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Data Jenis Laundry"
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
    const [getIdJenisLaundry, setIdJenisLaundry] = useState();
    const [getJenisLaundry, setJenisLaundry] = useState();
    const [getHarga, setHarga] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const tambahData = () => {
        axios.post("/jenislaundry", {
            id_jenislaundry: getIdJenisLaundry,
            jenis_laundry: getJenisLaundry,
            harga: getHarga
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
                <DialogTitle>{"Tambah Data JenisLaundry"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <TextField style={{ marginTop: 10 }} onChange={e => setIdJenisLaundry(e.target.value)} fullWidth type="text" id="id_jenislaundry" label="ID Jenis Laundry" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setJenisLaundry(e.target.value)} fullWidth type="text" id="jenis_laundry" label="Jenis Laundry" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setHarga(e.target.value)} fullWidth type="text" id="harga" label="Harga" variant="outlined" />
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
    const idJenisLaundry = props.idJenisLaundry;
    const [open, setOpen] = React.useState(false);
    const [getIdJenisLaundry, setIdJenisLaundry] = useState();
    const [getJenisLaundry, setJenisLaundry] = useState();
    const [getHarga, setHarga] = useState();

    const editData = (e) => {
        axios.patch(`/jenislaundry/${idJenisLaundry}`,
            {
                jenis_laundry: getJenisLaundry,
                harga: getHarga
            }).then((response) => {
                console.log(response);
                window.location.reload();
                setOpen(false);
            }).catch((err) => console.log("error", err))
    }

    const getJenisLaundryById = async () => {
        const response = await axios.get(`/jenislaundry/${idJenisLaundry}`).catch((err) => console.log("error", err))

        if (response && response.data) {
            setJenisLaundry(response.data.jenis_laundry)
            setHarga(response.data.harga)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getJenisLaundryById();
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
                <DialogTitle>{"Edit Data JenisLaundry"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <TextField style={{ marginTop: 10 }} defaultValue={idJenisLaundry} fullWidth type="text" id="id_jenislaundry" label="ID JenisLaundry" InputProps={{ readOnly: true }} variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getJenisLaundry} onChange={e => setJenisLaundry(e.target.value)} autoFocus={true} fullWidth type="text" id="jenis_laundry" label="Jenis Laundry" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getHarga} onChange={e => setHarga(e.target.value)} autoFocus={true} fullWidth type="text" id="harga" label="Harga" variant="outlined" />
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
    const idJenisLaundry = props.idJenisLaundry;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const hapusData = (e) => {
        axios.delete(`jenislaundry/${idJenisLaundry}`)
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
                        Apakah anda yakin ingin menghapus data jenislaundry dengan id {idJenisLaundry}
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
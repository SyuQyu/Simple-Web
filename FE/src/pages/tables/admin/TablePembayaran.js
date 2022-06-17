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
    DialogContentText, DialogTitle, Slide, TextField
} from '@mui/material';


const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Tables() {
    const [Pembayaran, setPembayaran] = useState([]);
    const classes = useStyles();
    const getPembayaran = async () => {
        const response = await axios.get("/pembayaran/").catch((err) => console.log("error", err))

        if (response && response.data) {
            setPembayaran(response.data)
            console.log(Pembayaran)
        }
    }
    const rows = Pembayaran.map((i) => {
        return {
            id_pembayaran: i.id_pembayaran,
            id_order: i.id_order,
            total_pembayaran: i.total_pembayaran,
            uang_masuk: i.uang_masuk,
            uang_keluar: i.uang_keluar,
            tgl_pembayaran: i.tgl_pembayaran,
            ref: <Grid container><Grid item lg={6}><PopUpDeleteData idPembayaran={i.id_pembayaran} /></Grid><Grid item lg={6}><PopupEditData idPembayaran={i.id_pembayaran} /></Grid></Grid>
        };
    });

    const columns = [
        {
            label: "ID Pembayaran",
            name: "id_pembayaran",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "ID Order",
            name: "id_order",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Total Pembayaran",
            name: "total_pembayaran",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Uang Masuk",
            name: "uang_masuk",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Uang Keluar",
            name: "uang_keluar",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Tgl Pembayaran",
            name: "tgl_pembayaran",
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
        getPembayaran();
    }, [])
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} xl={12}>
                    <Grid container>
                        <Grid item xl={6} lg={6}>
                            <PageTitle title="Table Pembayaran" />
                        </Grid>
                        <Grid item xl={6} lg={6}>
                            <PopUpTambahData />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Data Pembayaran"
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
    const [getIdPembayaran, setIdPembayaran] = useState();
    const [getIdOrder, setIdOrder] = useState();
    const [getTotalPembayaran, setTotalPembayaran] = useState();
    const [getUangMasuk, setUangMasuk] = useState();
    const [getUangKeluar, setUangKeluar] = useState();
    const [getTglPembayaran, setTglPembayaran] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const tambahData = () => {
        axios.post("/pembayaran", {
            id_pembayaran: getIdPembayaran,
            id_order: getIdOrder,
            total_pembayaran: getTotalPembayaran,
            uang_masuk: getUangMasuk,
            uang_keluar: getUangKeluar,
            tgl_pembayaran: getTglPembayaran
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
                <DialogTitle>{"Tambah Data Pembayaran"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <TextField style={{ marginTop: 10 }} onChange={e => setIdPembayaran(e.target.value)} fullWidth type="text" id="id_pembayaran" label="ID Pembayaran" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setIdOrder(e.target.value)} fullWidth type="text" id="id_order" label="ID Order" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setTotalPembayaran(e.target.value)} fullWidth type="text" id="total_pembayaran" label="Total Pembayaran" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setUangMasuk(e.target.value)} fullWidth type="text" id="uang_masuk" label="Uang Masuk" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setUangKeluar(e.target.value)} fullWidth type="text" id="uang_keluar" label="Uang Keluar" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Pilih Tanggal"
                            openTo="day"
                            views={['year', 'month', 'day']}
                            value={getTglPembayaran}
                            onChange={(newValue) => {
                                setTglPembayaran(newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth style={{ marginTop: 10 }} {...params} />}
                        />
                    </LocalizationProvider>
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
    const idPembayaran = props.idPembayaran;
    const [open, setOpen] = React.useState(false);
    const [getIdPembayaran, setIdPembayaran] = useState();
    const [getIdOrder, setIdOrder] = useState();
    const [getTotalPembayaran, setTotalPembayaran] = useState();
    const [getUangMasuk, setUangMasuk] = useState();
    const [getUangKeluar, setUangKeluar] = useState();
    const [getTglPembayaran, setTglPembayaran] = useState();
    const editData = (e) => {
        axios.patch(`/pembayaran/${idPembayaran}`,
            {
                id_member: getIdOrder,
                total_pembayaran: getTotalPembayaran,
                uang_masuk: getUangMasuk,
                uang_keluar: getUangKeluar,
                tgl_pembayaran: getTglPembayaran
            }).then((response) => {
                console.log(response);
                window.location.reload();
                setOpen(false);
            }).catch((err) => console.log("error", err))
    }

    const getPembayaranById = async () => {
        const response = await axios.get(`/Pembayaran/${idPembayaran}`).catch((err) => console.log("error", err))

        if (response && response.data) {
            setIdOrder(response.data.id_order)
            setTotalPembayaran(response.data.total_pembayaran)
            setUangMasuk(response.data.uang_masuk)
            setUangKeluar(response.data.uang_keluar)
            setTglPembayaran(response.data.tgl_pembayaran)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getPembayaranById();
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
                <DialogTitle>{"Edit Data Pembayaran"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <TextField style={{ marginTop: 10 }} defaultValue={idPembayaran} fullWidth type="text" id="id_pembayaran" label="ID Pembayaran" InputProps={{ readOnly: true }} variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getIdOrder} onChange={e => setIdOrder(e.target.value)} autoFocus={true} fullWidth type="text" id="id_order" label="ID Order" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getTotalPembayaran} onChange={e => setTotalPembayaran(e.target.value)} autoFocus={true} fullWidth type="text" id="total_pembayaran" label="Total Pembayaran" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getUangMasuk} onChange={e => setUangMasuk(e.target.value)} autoFocus={true} fullWidth type="text" id="uang_masuk" label="Uang Masuk" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getUangKeluar} onChange={e => setUangKeluar(e.target.value)} autoFocus={true} fullWidth type="text" id="uang_keluar" label="Uang Keluar" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Pilih Tanggal"
                            openTo="day"
                            views={['year', 'month', 'day']}
                            value={getTglPembayaran}
                            onChange={(newValue) => {
                                setTglPembayaran(newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth style={{ marginTop: 10 }} {...params} />}
                        />
                    </LocalizationProvider>
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
    const idPembayaran = props.idPembayaran;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const hapusData = (e) => {
        axios.delete(`pembayaran/${idPembayaran}`)
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
                        Apakah anda yakin ingin menghapus data Pembayaran dengan id {idPembayaran}
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
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
    const [order, setOrder] = useState([]);
    const classes = useStyles();
    const getOrder = async () => {
        const response = await axios.get("/orders/").catch((err) => console.log("error", err))

        if (response && response.data) {
            setOrder(response.data)
            console.log(order)
        }
    }
    const rows = order.map((i) => {
        return {
            id_order: i.id_order,
            id_member: i.id_member == null? "Tidak Ada ID" : i.id_member,
            id_paket: i.id_paket,
            nama_pelanggan: i.nama_pelanggan,
            no_telp: i.no_telp,
            alamat_pelanggan: i.alamat_pelanggan,
            jenis_laundry: i.id_jenislaundry == 1? "Cuci" : i.id_jenislaundry == 2? "Setrika" : "Cuci Dan Setrika",
            qty: i.qty,
            tgl_order: i.tgl_order,
            status_order: i.status_order,
            ref: <Grid container><Grid item lg={6}><PopUpDeleteData idOrder={i.id_order} /></Grid><Grid item lg={6}><PopupEditData idOrder={i.id_order} /></Grid></Grid>
        };
    });

    const columns = [
        {
            label: "ID Order",
            name: "id_order",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "ID Member",
            name: "id_member",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "ID Paket",
            name: "id_paket",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Nama Pelanggan",
            name: "nama_pelanggan",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "No Telepon",
            name: "no_telp",
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
            label: "Quantity",
            name: "qty",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Tanggal Order",
            name: "tgl_order",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Status Order",
            name: "status_order",
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
        getOrder();
    }, [])
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} xl={12}>
                    <Grid container>
                        <Grid item xl={6} lg={6}>
                            <PageTitle title="Table Order" />
                        </Grid>
                        <Grid item xl={6} lg={6}>
                            <PopUpTambahData />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Data Order"
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
    const [value, setValue] = React.useState(new Date());
    const [getIdOrder, setIdOrder] = useState();
    const [getIdMember, setIdMember] = useState();
    const [getIdPaket, setIdPaket] = useState();
    const [getNamaPelanggan, setNamaPelanggan] = useState();
    const [getNoTelepon, setNoTelepon] = useState();
    const [getAlamatPelanggan, setAlamatPelanggan] = useState();
    const [getJenisLaundry, setJenisLaundry] = useState();
    const [getQty, setQty] = useState();
    const [getTglOrder, setTglOrder] = useState();
    const [getStatusOrder, setStatusOrder] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const tambahData = () => {
        axios.post("/orders", {
            id_order: getIdOrder,
            id_member: getIdMember,
            id_paket: getIdPaket,
            nama_pelanggan: getNamaPelanggan,
            no_telp: getNoTelepon,
            alamat_pelanggan: getAlamatPelanggan,
            id_jenislaundry: getJenisLaundry,
            qty: getQty,
            tgl_order: getTglOrder,
            status_order: getStatusOrder
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
                <DialogTitle>{"Tambah Data Order"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <TextField style={{ marginTop: 10 }} onChange={e => setIdOrder(e.target.value)} fullWidth type="text" id="id_order" label="ID Order" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setIdMember(e.target.value)} fullWidth type="text" id="id_member" label="ID Member" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setIdPaket(e.target.value)} fullWidth type="text" id="id_paket" label="ID Paket" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setNamaPelanggan(e.target.value)} fullWidth type="text" id="nama_pelanggan" label="Nama Pelanggan" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setNoTelepon(e.target.value)} fullWidth type="text" id="no_telp" label="No Telepon" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setAlamatPelanggan(e.target.value)} fullWidth type="text" id="alamat_pelanggan" label="Alamat Pelanggan" variant="outlined" />
                    <FormControl fullWidth style={{ marginTop: 10 }}>
                        <InputLabel id="jenis_laundry">Jenis Laundry</InputLabel>
                        <Select
                            labelId="jenis_laundry"
                            id="jenis_laundry"
                            value={getJenisLaundry}
                            label="Jenis Laundry"
                            onChange={e => setJenisLaundry(e.target.value)}
                        >
                            <MenuItem value={1}>Cuci</MenuItem>
                            <MenuItem value={2}>Setrika</MenuItem>
                            <MenuItem value={3}>Cuci Dan Setrika</MenuItem>
                        </Select>
                    </FormControl>
                    {console.log(getJenisLaundry)}
                    <TextField style={{ marginTop: 10 }} onChange={e => setQty(e.target.value)} fullWidth type="text" id="qty" label="Quantity" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Pilih Tanggal"
                            openTo="day"
                            views={['year', 'month', 'day']}
                            value={getTglOrder}
                            onChange={(newValue) => {
                                setTglOrder(newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth style={{ marginTop: 10 }} {...params} />}
                        />
                        {console.log(getTglOrder)}
                    </LocalizationProvider>
                    <FormControl fullWidth style={{ marginTop: 10 }}>
                        <InputLabel id="status_order">Status Order</InputLabel>
                        <Select
                            labelId="status_order"
                            id="status_order"
                            value={getStatusOrder}
                            label="Status Order"
                            onChange={e => setStatusOrder(e.target.value)}
                        >
                            <MenuItem value={"Selesai"}>Selesai</MenuItem>
                            <MenuItem value={"Pending"}>Pending</MenuItem>
                            <MenuItem value={"Cancel"}>Cancel</MenuItem>
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
    const idOrder = props.idOrder;
    const [open, setOpen] = React.useState(false);
    const [getIdOrder, setIdOrder] = useState();
    const [getIdMember, setIdMember] = useState();
    const [getIdPaket, setIdPaket] = useState();
    const [getNamaPelanggan, setNamaPelanggan] = useState();
    const [getNoTelepon, setNoTelepon] = useState();
    const [getAlamatPelanggan, setAlamatPelanggan] = useState();
    const [getJenisLaundry, setJenisLaundry] = useState();
    const [getQty, setQty] = useState();
    const [getTglOrder, setTglOrder] = useState();
    const [getStatusOrder, setStatusOrder] = useState();

    const editData = (e) => {
        axios.patch(`/orders/${idOrder}`,
            {
                id_member: getIdMember,
                id_paket: getIdPaket,
                nama_pelanggan: getNamaPelanggan,
                no_telp: getNoTelepon,
                alamat_pelanggan: getAlamatPelanggan,
                id_jenisLaundry: getJenisLaundry,
                qty: getQty,
                tgl_order: getTglOrder,
                status_order: getStatusOrder
            }).then((response) => {
                console.log(response);
                window.location.reload();
                setOpen(false);
            }).catch((err) => console.log("error", err))
    }

    const getOrderById = async () => {
        const response = await axios.get(`/orders/${idOrder}`).catch((err) => console.log("error", err))

        if (response && response.data) {
            setIdMember(response.data.id_member)
            setIdPaket(response.data.id_paket)
            setNamaPelanggan(response.data.nama_pelanggan)
            setNoTelepon(response.data.no_telp)
            setAlamatPelanggan(response.data.alamat_pelanggan)
            setJenisLaundry(response.data.id_jenislaundry)
            setQty(response.data.qty)
            setTglOrder(response.data.tgl_order)
            setStatusOrder(response.data.status_order)
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
                    <TextField style={{ marginTop: 10 }} defaultValue={idOrder} fullWidth type="text" id="id_order" label="ID Order" InputProps={{ readOnly: true }} variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getIdMember} onChange={e => setIdMember(e.target.value)} autoFocus={true} fullWidth type="text" id="id_member" label="ID Member" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getIdPaket} onChange={e => setIdPaket(e.target.value)} autoFocus={true} fullWidth type="text" id="id_paket" label="ID Paket" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getNamaPelanggan} onChange={e => setNamaPelanggan(e.target.value)} autoFocus={true} fullWidth type="text" id="nama_pelanggan" label="Nama Pelanggan" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getNoTelepon} onChange={e => setNoTelepon(e.target.value)} autoFocus={true} fullWidth type="text" id="no_telp" label="No Telepon" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getAlamatPelanggan} onChange={e => setAlamatPelanggan(e.target.value)} autoFocus={true} fullWidth type="text" id="alamat_pelanggan" label="Alamat Pelanggan" variant="outlined" />
                    <FormControl fullWidth style={{ marginTop: 10 }}>
                        <InputLabel id="jenis_laundry">Jenis Laundry</InputLabel>
                        <Select
                            labelId="jenis_laundry"
                            id="jenis_laundry"
                            value={getJenisLaundry}
                            label="Jenis Laundry"
                            onChange={e => setJenisLaundry(e.target.value)}
                        >
                            <MenuItem value={1}>Cuci</MenuItem>
                            <MenuItem value={2}>Setrika</MenuItem>
                            <MenuItem value={3}>Cuci Dan Setrika</MenuItem>
                        </Select>
                    </FormControl>
                    {console.log(getJenisLaundry)}
                    <TextField style={{ marginTop: 10 }} value={getQty} onChange={e => setQty(e.target.value)} autoFocus={true} fullWidth type="text" id="qty" label="Quantity" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Pilih Tanggal"
                            openTo="day"
                            views={['year', 'month', 'day']}
                            value={getTglOrder}
                            onChange={(newValue) => {
                                setTglOrder(newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth style={{ marginTop: 10 }} {...params} />}
                        />
                        {console.log(getTglOrder)}
                    </LocalizationProvider>
                    <FormControl fullWidth style={{ marginTop: 10 }}>
                        <InputLabel id="status_order">Status Order</InputLabel>
                        <Select
                            labelId="status_order"
                            id="status_order"
                            value={getStatusOrder}
                            label="Status Order"
                            onChange={e => setStatusOrder(e.target.value)}
                        >
                            <MenuItem value={"Selesai"}>Selesai</MenuItem>
                            <MenuItem value={"Pending"}>Pending</MenuItem>
                            <MenuItem value={"Cancel"}>Cancel</MenuItem>
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
    const idOrder = props.idOrder;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const hapusData = (e) => {
        axios.delete(`orders/${idOrder}`)
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
                        Apakah anda yakin ingin menghapus data order dengan id {idOrder}
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
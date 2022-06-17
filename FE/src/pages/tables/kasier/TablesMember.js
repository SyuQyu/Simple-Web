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
    const [member, setMember] = useState([]);
    const classes = useStyles();
    const getMember = async () => {
        const response = await axios.get("/members/").catch((err) => console.log("error", err))

        if (response && response.data) {
            setMember(response.data)
            console.log(member)
        }
    }
    const rows = member.map((i) => {
        return {
            id_member: i.id_member,
            nama_member: i.nama_member,
            no_telp: i.no_telp,
            alamat: i.alamat,
            ref: <Grid container><Grid item lg={6}><PopUpDeleteData idmember={i.id_member} /></Grid><Grid item lg={6}><PopupEditData idmember={i.id_member} /></Grid></Grid>
        };
    });

    const columns = [
        {
            label: "ID member",
            name: "id_member",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Nama Member",
            name: "nama_member",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Nomor Telepon",
            name: "no_telp",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Alamat",
            name: "alamat",
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
        getMember();
    }, [])
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} xl={12}>
                    <Grid container>
                        <Grid item xl={6} lg={6}>
                            <PageTitle title="Table Member" />
                        </Grid>
                        <Grid item xl={6} lg={6}>
                            <PopUpTambahData />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Data Member"
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
    const [getIdMember, setIdMember] = useState();
    const [getNamaMember, setNamaMember] = useState();
    const [getNoTelp, setNoTelp] = useState();
    const [getAlamat, setAlamat] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const tambahData = () => {
        axios.post("/members", {
            id_member: getIdMember,
            nama_member: getNamaMember,
            no_telp: getNoTelp,
            alamat: getAlamat
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
                <DialogTitle>{"Tambah Data member"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <TextField style={{ marginTop: 10 }} onChange={e => setIdMember(e.target.value)} fullWidth type="text" id="id_member" label="ID member" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setNamaMember(e.target.value)} fullWidth type="text" id="nama_member" label="Nama member" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setNoTelp(e.target.value)} fullWidth type="text" id="no_telp" label="Nomor Telepon" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} onChange={e => setAlamat(e.target.value)} fullWidth type="text" id="alamat" label="Alamat" variant="outlined" />
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
    const idmember = props.idmember;
    const [open, setOpen] = React.useState(false);
    const [getIdMember, setIdMember] = useState();
    const [getNamaMember, setNamaMember] = useState();
    const [getNoTelp, setNoTelp] = useState();
    const [getAlamat, setAlamat] = useState();

    const editData = (e) => {
        axios.patch(`/members/${idmember}`,
            {
                nama_member: getNamaMember,
                no_telp: getNoTelp,
                alamat: getAlamat
            }).then((response) => {
                console.log(response);
                window.location.reload();
                setOpen(false);
            }).catch((err) => console.log("error", err))
    }

    const getmemberById = async () => {
        const response = await axios.get(`/members/${idmember}`).catch((err) => console.log("error", err))

        if (response && response.data) {
            setNamaMember(response.data.nama_member)
            setNoTelp(response.data.no_telp)
            setAlamat(response.data.alamat)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getmemberById();
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
                <DialogTitle>{"Edit Data member"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <TextField style={{ marginTop: 10 }} defaultValue={idmember} fullWidth type="text" id="id_member" label="ID member" InputProps={{ readOnly: true }} variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getNamaMember} onChange={e => setNamaMember(e.target.value)} autoFocus={true} fullWidth type="text" id="nama_member" label="Nama member" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getNoTelp} onChange={e => setNoTelp(e.target.value)} autoFocus={true} fullWidth type="text" id="no_telp" label="Nomor Telepon" variant="outlined" />
                    <TextField style={{ marginTop: 10 }} value={getAlamat} onChange={e => setAlamat(e.target.value)} autoFocus={true} fullWidth type="text" id="alamat" label="Alamat" variant="outlined" />
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
    const idmember = props.idmember;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const hapusData = (e) => {
        axios.delete(`members/${idmember}`)
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
                        Apakah anda yakin ingin menghapus data member dengan id {idmember}
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
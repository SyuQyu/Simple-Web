import React, {useState, useEffect} from 'react';
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
import { Button, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Slide, TextField } from '@mui/material';


const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
  const [paket, setPaket] = useState([]);
  const classes = useStyles();
  const getPaket = async () => {
    const response = await axios.get("/paket/").catch((err) => console.log("error", err))

    if(response && response.data) {
      setPaket(response.data)
      console.log(paket)
    }
  }
  const rows = paket.map((i) => {
    return {
      id_paket: i.id_paket,
      jenis_paket: i.jenis_paket,
      harga_paket: i.harga_paket,
      ref: <Grid container><Grid item lg={12}><PopupEditData idPaket={i.id_paket} /></Grid></Grid>
    };
  });

  const columns = [
    {
      label: "ID Paket",
      name: "id_paket",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Jenis Paket",
      name: "jenis_paket",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Harga Paket",
      name: "harga_paket",
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
getPaket();
},[])
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} xl={12}>
          <Grid container>
            <Grid item xl={6} lg={6}>
              <PageTitle title="Table Paket" />
            </Grid>
            <Grid item xl={6} lg={6}>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Data Paket"
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
  const [getIdPaket, setIdPaket] = useState();
  const [getJenisPaket, setJenisPaket] = useState();
  const [getHargaPaket, setHargaPaket] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const tambahData = () => {
    axios.post("/paket", {
      id_paket: getIdPaket,
      jenis_paket: getJenisPaket,
      harga_paket: getHargaPaket
    }).then((response) => {
      console.log(response);
      window.location.reload();
      setOpen(false);
  }).catch((err) => console.log("error", err))
  }
  return (
    <div>
      <IconButton style={{float: 'right', marginTop: 35}} color="primary" onClick={handleClickOpen}>
        <AddCircleRoundedIcon fontSize="large"/>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Tambah Data Paket"}</DialogTitle>
        <DialogContent style={{width: '500px'}}>
          <TextField style={{ marginTop: 10}} onChange={e => setIdPaket(e.target.value)} fullWidth type="text" id="id_paket" label="ID Paket" variant="outlined" />
          <TextField style={{ marginTop: 10}} onChange={e => setJenisPaket(e.target.value)} fullWidth type="text" id="jenis_paket" label="Jenis Paket" variant="outlined" />
          <TextField style={{ marginTop: 10}} onChange={e => setHargaPaket(e.target.value)} fullWidth type="text" id="harga_paket" label="Harga Paket" variant="outlined" />
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
  const idPaket = props.idPaket;
  const [open, setOpen] = React.useState(false);
  const [getIdPaket, setIdPaket] = useState();
  const [getJenisPaket, setJenisPaket] = useState();
  const [getHargaPaket, setHargaPaket] = useState();

  const editData = (e) => {
    axios.patch(`/paket/${idPaket}`,
    {
      jenis_paket: getJenisPaket,
      harga_paket: getHargaPaket
    }).then((response) => {
      console.log(response);
      window.location.reload();
      setOpen(false);
    }).catch((err) => console.log("error", err))
    }

    const getPaketById = async () => {
      const response = await axios.get(`/paket/${idPaket}`).catch((err) => console.log("error", err))

      if(response && response.data) {
          setJenisPaket(response.data.jenis_paket)
          setHargaPaket(response.data.harga_paket)
      }
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getPaketById();
  },[])
  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <EditRoundedIcon fontSize="medium"/>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Data Paket"}</DialogTitle>
        <DialogContent style={{width: '500px'}}>
          <TextField style={{ marginTop: 10}} defaultValue={idPaket} fullWidth type="text" id="id_paket" label="ID Paket" InputProps={{readOnly: true}} variant="outlined" />
          <TextField style={{ marginTop: 10}} value={getJenisPaket} onChange={e => setJenisPaket(e.target.value)} autoFocus={true} fullWidth type="text" id="jenis_paket" label="Jenis Paket" variant="outlined" />
          <TextField style={{ marginTop: 10}} value={getHargaPaket} onChange={e => setHargaPaket(e.target.value)} autoFocus={true} fullWidth type="text" id="harga_paket" label="Harga Paket" variant="outlined" />
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
  const idPaket = props.idPaket;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const hapusData = (e) => {
    axios.delete(`paket/${idPaket}`)
      .then(res => {
          console.log(res);
          console.log(res.data);
          setOpen(false);
          window.location.reload();
      })
  }
  return (
    <div>
      <IconButton color="primary" style={{float: 'left'}} onClick={handleClickOpen}>
        <DeleteRoundedIcon fontSize="medium"/>
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
            Apakah anda yakin ingin menghapus data paket dengan id {idPaket}
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
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



import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import photo from './photos/123.jpeg'
import bacot from './photos/pandu.jpeg'
import jemu from './photos/jemu.jpeg'
import fajar from './photos/fajar.jpeg'
import teguh from './photos/teguhh.jpeg'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@material-ui/core';

export default function ActionAreaCard() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 380 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image={photo}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h7" component="div">
                                2110511005 - Abdullah Aqil Athallah
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image={bacot}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h7" component="div">
                                2110511007 - Pandu Utomo
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image={jemu}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h7" component="div">
                                2110511008 - Jesslyn Mu
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image={fajar}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h7" component="div">
                                2110511029 - Fajar Rizki Ramadhan
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image={teguh}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h7" component="div">
                                2110511036 - Muhammad Teguh Prananto
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>

    );
}
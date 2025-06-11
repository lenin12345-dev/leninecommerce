'use client';

import React from 'react';
import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FolderNodata from '../Components/FolderNodata';

const useStyles = makeStyles(() => ({
    noDataCardContent: {
        paddingBottom: 0,
        paddingTop: 15,
        textAlign: 'center',
        minHeight: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    root: {
        boxShadow: 'none',
        height: '100%',  // Ensure the card fills the container
        width: '100%'    // Ensure the card fills the container
    }
}));

function NoDataCard({ noDataFoundText, icon = <FolderNodata style={{ fontSize: '13em' }} />, styleCardProps = {},  textProps = {} }) {
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <Card className={classes.root} style={{ ...styleCardProps.style }}>
                <CardContent className={classes.noDataCardContent}>
                    {icon}
                    {/* {...textProps} spreads it into JSX as individual props ✅ */}
                    {/* Useful for passing styles and custom props dynamically */}
                    {typeof noDataFoundText === 'string' ?
                        <Typography variant="h5"  {...textProps}>
                            {noDataFoundText}
                        </Typography>
                        : noDataFoundText
                    }
                </CardContent>
            </Card>
        </Grid>
    );
}

export default NoDataCard;

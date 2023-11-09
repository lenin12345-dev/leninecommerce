'use client';

import React from 'react';
import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import FolderNodata from '../Components/FolderNodata';


const useStyles = makeStyles(() => ({
    noDataCardContent:{
        paddingBottom: 0, paddingTop: 15,textAlign: 'center',minHeight:300,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    root:{
        boxShadow:'none'
    }
}));
function NoDataCard({noDataFoundText,icon= <FolderNodata style={{fontSize: '13em'}}/> ,styleCardProps={}}) {
    const classes = useStyles();
    
    return (
        <Grid item xs={12}>
            <Card {...styleCardProps} className={classes.root}>
                <CardContent {...styleCardProps} className={classes.noDataCardContent}>
                    {icon}
                    {typeof noDataFoundText === 'string'?
                        <Typography 
                            variant="h5"
                        // color={'textSecondary'}
                        >
                            {noDataFoundText}

                        </Typography>:noDataFoundText
                    }
                    
                </CardContent>
            </Card>
        </Grid>
    );
}


export default NoDataCard;

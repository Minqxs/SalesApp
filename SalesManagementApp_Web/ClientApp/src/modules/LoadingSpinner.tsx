import { Box, Grid2 } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
    DialogProps?: Omit<DialogProps, 'open'>;
    title?: string;
}
export default function Loading({
    title,
}: Props) {
    const LoadingComponent = () => (
        <Box sx={{
            width: 60,
            height: 60,
            color: '#ffffff',
            backgroundColor: 'transparent',
        }}>
            <CircularProgress
                color="inherit"
                size={40}
                thickness={6}
                variant="indeterminate"
            />
        </Box>
    );

    return (
        <Grid2 container size={8}>
            <Grid2>
                <Typography variant="h2">{title ?? 'Loading ...'}</Typography>
            </Grid2>
            <Grid2 size={1}></Grid2>
            <Grid2 size={3}>
                <LoadingComponent />
            </Grid2>
        </Grid2>
    )
}

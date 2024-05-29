import React from "react";
import { Grid, TextField, Button } from "@mui/material";

const ReportFilters = () => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
                <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <Button variant="contained" color="primary" fullWidth>
                    Apply Filters
                </Button>
            </Grid>
        </Grid>
    );
};

export default ReportFilters;

import React from 'react';
import { Container, Box, Typography, TextField, List, ListItem, ListItemText, Paper } from '@mui/material';

const researchNotes = [
    "Conduct literature review on the latest research trends.",
    "Compile a list of key publications in the field.",
    "Identify potential collaborators or research groups."
];

const supportResources = [
    { title: "Research Library", link: "https://www.researchlibrary.com" },
    { title: "Support Team", link: "mailto:support@researchsupport.com" },
    { title: "Funding Opportunities", link: "https://www.fundingopportunities.com" },
];

const ResearchAndSupport = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Research and Support
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Research Notes
                </Typography>
                <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                    <List>
                        {researchNotes.map((note, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={note} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <TextField
                    label="Add New Research Note"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Typography variant="h6" gutterBottom>
                    Support Resources
                </Typography>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <List>
                        {supportResources.map((resource, index) => (
                            <ListItem key={index} component="a" href={resource.link} target="_blank">
                                <ListItemText primary={resource.title} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
};

export default ResearchAndSupport;

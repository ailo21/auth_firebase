import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';


const BasicTextFields = ({title, setEmail, setPassword, handleAction}) => {
    return (
        <div>
            <div className="heading-container">
                <h3>{title} Form</h3>
            </div>

            <Box
                component="form"
                onSubmit={handleAction}
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="email"
                    label="Enter the Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Enter the password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Button
                title={title}
                handleAction={handleAction}
            />
        </div>

    );
};
export default BasicTextFields;


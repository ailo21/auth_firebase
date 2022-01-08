import React from 'react';
import Button from '@mui/material/Button';

const BasicButtons = ({title,handleAction}) => {
    return (
        <Button type={"submit"} variant="contained" onClick={handleAction}>{title}</Button>
    );
};

export default BasicButtons;
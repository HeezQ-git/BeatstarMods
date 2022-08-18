import { TextField, IconButton, InputAdornment } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';

const Input = (props, { password, font, adornment, starticon, ref }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    let inputProps = null;
    if (font) {
        inputProps = { style: { fontSize: font } };
    }

    if (password && !adornment) {
        return (
            <TextField
                ref={ref}
                type={showPassword ? 'text' : 'password'}
                InputLabelProps={inputProps}
                InputProps={{
                    ...inputProps,
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleClickShowPassword} edge='end'>
                                {showPassword ? <MdVisibilityOff size={22.5} /> : <MdVisibility size={22.5} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                {...props}
            />
        );
    } else if (starticon) {
        return (
            <TextField
                ref={ref}
                InputLabelProps={inputProps}
                InputProps={{
                    startAdornment: <InputAdornment position='start'>{starticon}</InputAdornment>,
                }}
                {...props}
            />
        );
    } else {
        return <TextField ref={ref} InputLabelProps={inputProps} InputProps={inputProps} {...props} />;
    }
};

export default Input;

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: 12,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}


const NuevoProviderModal = ({ open, onClose, onSubmit }) => {
    const [newProviderData, setNewProviderData] = useState({
        name: '',
        email: '',
        product: '',
        phone: ''
    });
    const [formErrors, setFormErrors] = useState({
        nameError: '',
        emailError: '',
        productError: '',
        phoneError: ''

    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Validar los campos antes de enviar el formulario
        if (!newProviderData.name) {
            setFormErrors((prevErrors) => ({ ...prevErrors, nameError: 'Name is required' }));
            return;
        }
        if (!newProviderData.email) {
            setFormErrors((prevErrors) => ({ ...prevErrors, emailError: 'Email is required' }));
            return;
        }
        if (!newProviderData.product) {
            setFormErrors((prevErrors) => ({ ...prevErrors, productError: 'Product is required' }));
            return;
        }
        if (!newProviderData.phone) {
            setFormErrors((prevErrors) => ({ ...prevErrors, phoneError: 'Phone is required' }));
            return;
        }

        // Limpiar los errores de validación
        setFormErrors({ nameError: '', emailError: '' });
        onSubmit(newProviderData);
        setNewProviderData({ name: '', email: '', product: '', phone: '' });
    };

    const handleFormInputChange = (e) => {
        setNewProviderData({ ...newProviderData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <BootstrapDialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                    Create new Provider
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={newProviderData.name}
                            onChange={handleFormInputChange}
                            fullWidth
                            required
                            error={Boolean(formErrors.nameError)}
                            helperText={formErrors.nameError}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={newProviderData.email}
                            onChange={handleFormInputChange}
                            fullWidth
                            required
                            error={Boolean(formErrors.emailError)}
                            helperText={formErrors.emailError}
                        />
                        <TextField
                            label="Product"
                            name="product"
                            value={newProviderData.product}
                            onChange={handleFormInputChange}
                            fullWidth
                            required
                            error={Boolean(formErrors.productError)}
                            helperText={formErrors.productError}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={newProviderData.phone}
                            onChange={handleFormInputChange}
                            fullWidth
                            required
                            error={Boolean(formErrors.phoneError)}
                            helperText={formErrors.phoneError}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleFormSubmit}>
                        save
                    </Button>
                    <Button autoFocus onClick={onClose}>
                        cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default NuevoProviderModal;

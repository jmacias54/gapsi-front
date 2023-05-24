import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSnackbar from './CustomSnackbar';
import axios from 'axios';
import React, { useState } from 'react';



const RenderOptionsCell = (params, fetchData) => {
    const [customSnackbarOpen, isCustomSnackbarOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");

    const handleEdit = () => {
        // Lógica para editar el elemento
    };

    const handleDetail = () => {
        // Lógica para ver los detalles del elemento
    };

    const handleDelete = async () => {
        // Lógica para eliminar el registro
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL_PROVIDERS}${params.row.id}`);
            console.log('Registro eliminado:', response.data);
            isCustomSnackbarOpen(true);
            setAlertMessage("Exito eliminar el registro:");
            setAlertSeverity("success");
            fetchData(); // Actualizar los datos después de eliminar el registro
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
            isCustomSnackbarOpen(true);
            setAlertMessage("Error al eliminar el registro:" + error);
            setAlertSeverity("warning");
        }
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        isCustomSnackbarOpen(false);
        setAlertMessage("");
        setAlertSeverity("");
    };

    return (
        <div>
            <Button onClick={handleDelete} color="error">
                <DeleteIcon />
            </Button>
            <CustomSnackbar
                message={alertMessage}
                severity={alertSeverity}
                open={customSnackbarOpen}
                handleClose={handleAlertClose}
            />
        </div>
    );
};

export default RenderOptionsCell;

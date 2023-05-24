import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import renderOptionsCell from '../utils/RenderOptionsCell';
import Button from '@mui/material/Button';
import NuevoProviderModal from './NewProviderModal';
import CustomSnackbar from '../utils/CustomSnackbar';


const Providers = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [customSnackbarOpen, isCustomSnackbarOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_PROVIDERS}`);
      const formattedData = response.data.map((row) => ({
        id: row._id, // Asignar el valor del campo _id como id único
        name: row.name,
        email: row.email,
        product: row.product
      }));
      setData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };


  const handleRowDelete = async (selectedRows) => {
    try {
      const deletedRows = selectedRows.map((row) => row.id);
      await axios.delete(`${process.env.REACT_APP_API_URL_PROVIDERS}`, { data: deletedRows });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };


  const handleCreate = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    isCustomSnackbarOpen(false);
    setAlertMessage("");
    setAlertSeverity("");
  };


  const handleFormSubmit = async (newProviderData) => {
    console.log(newProviderData)
    try {
      // Lógica para llamar al API REST y crear el nuevo proveedor
      const response = await axios.post(`${process.env.REACT_APP_API_URL_PROVIDERS}`, newProviderData);
      console.log('Nuevo proveedor creado:', response.data);
      setOpenModal(false);
      isCustomSnackbarOpen(true);
      setAlertMessage("se creo un nuevo registro");
      setAlertSeverity("success");
      fetchData(); // Actualizar los datos después de crear el proveedor
    } catch (error) {
      console.error('Error al crear el proveedor:', error);
      isCustomSnackbarOpen(true);
      setAlertMessage("Error al crear el proveedor:" + error);
      setAlertSeverity("warning");
    }
    setOpenModal(false);

  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'product', headerName: 'Product', width: 200 },
    {
      field: 'opciones',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => renderOptionsCell(params, fetchData), // Pasar fetchData como prop
    }
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          New Provider
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };


  return (
    <div style={{ height: 400, width: '90%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableSelectionOnClick
        onSelectionModelChange={(selectedRows) => console.log(selectedRows)}
        onDeleteRows={handleRowDelete}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      <NuevoProviderModal open={openModal} onClose={handleModalClose} onSubmit={handleFormSubmit} />
      <CustomSnackbar
        message={alertMessage}
        severity={alertSeverity}
        open={customSnackbarOpen}
        handleClose={handleAlertClose}
      />
    </div>

  );
};

export default Providers;

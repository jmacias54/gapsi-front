import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';


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


const ModalIndex = ({ closeModal }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_VERSION}`);
        console.log(response)
        setData(response.data);
      } catch (error) {
        // Manejar errores de la petición
      }
    };
    fetchData();

  }, []);


  return (
    <div>
      <BootstrapDialog
        onClose={closeModal}
        aria-labelledby="customized-dialog-title"
        open={closeModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={closeModal}>
          e-commerce GAPSI&nbsp;&nbsp;
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {data ? (
            <>
              <Stack direction="row">
                <CardMedia
                  component="img"
                  alt="Descripción de la imagen"
                  height="100"
                  image="/assetss/images/logo.png"
                />

              </Stack>
              <Typography gutterBottom>{data}</Typography>
              {/* Renderizar más datos según la estructura de la respuesta */}
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeModal}>
            Continue
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>


  );
};

export default ModalIndex;

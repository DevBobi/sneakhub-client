import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import PopupSuccess from '../../Popup/PopupSuccess';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
};
const PurchaseModal = ({ bookingOpen, handleBookingClose, singleProduct, setBookingSuccess }) => {
    const { user } = useAuth();

    // const initialInfo = {}
    const [bookingInfo, setBookingInfo] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookingInfo(newInfo);
    }

    const handlePurchaseSubmit = e => {

        // collect data
        const order = {
            ...bookingInfo,
            status: "pending",
            email: user?.email,
            date: new Date().toLocaleDateString(),
            singleProduct
        }
        // send to the server
        fetch('https://safe-waters-12222.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    PopupSuccess("booked");
                    handleBookingClose();
                }
            })
        e.preventDefault();
    }

    return (
        <div>
            <Modal
                open={bookingOpen}
                onClose={handleBookingClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <Box component="form" onSubmit={handlePurchaseSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2} sx={{ my: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Your Name"
                                    id="outlined-size-small"
                                    name="name"
                                    onBlur={handleOnBlur}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Phone"
                                    id="outlined-size-small"
                                    name="phone"
                                    onBlur={handleOnBlur}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="City"
                                    id="outlined-size-small"
                                    name="city"
                                    onBlur={handleOnBlur}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Address"
                                    id="outlined-size-small"
                                    name="address"
                                    onBlur={handleOnBlur}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Place Order
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default PurchaseModal;
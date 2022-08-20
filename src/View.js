import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { prodStyle } from './ProductStyle';
import {
    Box, Container, Grid, FormControl, InputLabel, OutlinedInput, Select, MenuItem,
    Typography, Autocomplete, TextField, FormGroup, FormControlLabel, Checkbox,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
    Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputAdornment, Tooltip
} from '@mui/material';
import MUIEditor, { MUIEditorState } from "react-mui-draft-wysiwyg";
import CloseIcon from '@mui/icons-material/Close';
import { FcInfo } from "react-icons/fc";

function Productview() {

    // Modal
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const BootstrapDialogTitle = (props) => {
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
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };


    // Unit Modal
    const [unitmodal, setUnitmodal] = useState(false);

    const handleClickOpen1 = () => {
        setUnitmodal(true);
    };
    const handleClose1 = () => {
        setUnitmodal(false);
    };
    // Brand Modal
    const [brandmodal, setBrandmodal] = useState(false);

    const handleClickOpen2 = () => {
        setBrandmodal(true);
    };
    const handleClose2 = () => {
        setBrandmodal(false);
    };


    // Text Editor
    const [editorState, setEditorState] = useState(
        MUIEditorState.createEmpty(),
    )
    const onChange = newState => {
        setEditorState(newState)
    }

    //Text field
    const [productView, setProductView] = useState({
        productviewname: "", productviewsku: "", productviewbarcode: "", productviewunit: "",
        productviewbrand: "", productviewcategory: "", productviewsubcat: "", productviewbusinessloc: "",
        productviewalert: "", productviewapplicable: "", productviewsellingtax: "", productviewproducttype: "",
        productviewexc: "", productviewinc: "", productviewmarg: "", productviewexctax: "", productviewinctax: ""

    });

    // ************* Modal ************* //
    // ****** Unit Modal ****** //

    const[productViewUnitMod, setProductViewUnitMod] = useState({
        productviewunitprodname:"", productviewunitshortname:"", productviewunitallow:""
    });


    // ****** Brand Modal ****** //
  
    const[productViewBrandMod, setProductViewBrandMod] = useState({
        prodviewBrdModBrdName:"", prodviewBrdModShortDes:"",
    });
    
    // ****** Multi Select ****** //
    const top100Films = [
        { title: 'xxxx' },
        { title: 'yyyy' },
        { title: 'zzzz' },
        { title: 'aaaa' },
        { title: 'ssss' },
        { title: 'xxxx' },
        { title: 'dddd' },
    ];

    return (
        <Box>
            <form action=''>
                <Container sx={{ paddingTop: '10px' }}>
                    <Grid display="flex">
                        <Typography variant="h6">View Product</Typography>&ensp;
                        <Typography variant='body2' sx={{ marginLeft: '10px', marginTop: '5px' }}>Products | View product</Typography>
                    </Grid>
                </Container><br />
                <Container sx={prodStyle.prod_container}>
                    <Grid container spacing={2} sx={{
                        padding: '40px 20px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid #b97df0',
                        },
                    }}>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl size="small" fullWidth >
                                <InputLabel htmlFor="component-outlined" >Product Name *</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={productView.productviewname}
                                    onChange={(e) => { setProductView({ ...productView, Productviewname: e.target.value }) }}
                                    label="Product Name *"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">SKU *</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    endAdornment={
                                        <Tooltip title='"Unique product id or Stock Keeping Unit Keep it blank to automatically generate sku.You can modify sku prefix in Business settings.' placement="top">
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    value={productView.productviewsku}
                                                    onChange={(e) => { setProductView({ ...productView, Productviewsku: e.target.value }) }}
                                                >
                                                    <FcInfo />
                                                </IconButton>
                                            </InputAdornment>
                                        </Tooltip>
                                    }
                                    label="SKU *"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl size="small" fullWidth

                            >
                                <InputLabel id="demo-select-small">Barcode type</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={productView.productviewbarcode}
                                    onChange={(e) => { setProductView({ ...productView, Productviewbarcode: e.target.value }) }}
                                    label="Barcode type"
                                >
                                    <MenuItem value="">
                                        Code 128 (C128)
                                    </MenuItem>
                                    <MenuItem value={1}>Code 39 (C39)</MenuItem>
                                    <MenuItem value={2}>EAN-13</MenuItem>
                                    <MenuItem value={3}>EAN-8</MenuItem>
                                    <MenuItem value={4}>UPC-A</MenuItem>
                                    <MenuItem value={5}>UPC-E</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl size="small" fullWidth sx={{ display: 'flex' }}>
                                <InputLabel id="demo-select-small">Unit *</InputLabel>
                                <Grid sx={{ display: 'flex' }}  >
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={productView.productviewunit}
                                        onChange={(e) => { setProductView({ ...productView, Productviewunit: e.target.value }) }}
                                        label="Unit *"
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>Please Select</em>
                                        </MenuItem>
                                        <MenuItem value={1}>yyy</MenuItem>
                                        <MenuItem value={2}>xxx</MenuItem>
                                    </Select>
                                    <Grid sx={{ fontSize: '24px', paddingLeft: '6px', margin: 'auto', border: '1px solid #b97df0', width: '33px', height: '40px', borderRadius: '2px', backgroundColor: '#b97df0', color: '#fff' }} onClick={handleClickOpen1} >+</Grid>
                                </Grid>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl size="small" fullWidth sx={{ display: 'flex' }}>
                                <InputLabel id="demo-select-small">Brand</InputLabel>
                                <Grid sx={{ display: 'flex' }}  >
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={productView.productviewbrand}
                                        onChange={(e) => { setProductView({ ...productView, Productviewbrand: e.target.value }) }}
                                        label="Brand"
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>Please Select</em>
                                        </MenuItem>
                                        <MenuItem value={1}>yyy</MenuItem>
                                        <MenuItem value={2}>xxx</MenuItem>
                                    </Select>
                                    <Grid sx={{ fontSize: '24px', paddingLeft: '6px', margin: 'auto', border: '1px solid #b97df0', width: '33px', height: '40px', borderRadius: '2px', backgroundColor: '#b97df0', color: '#fff' }} onClick={handleClickOpen2} >+</Grid>                            </Grid>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-select-small">Category</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={productView.productviewcategory}
                                    onChange={(e) => { setProductView({ ...productView, Productviewcategory: e.target.value }) }} label="Category"
                                >
                                    <MenuItem value="">
                                        <em>Please Select</em>
                                    </MenuItem>
                                    <MenuItem value={1}>yyy</MenuItem>
                                    <MenuItem value={2}>xxx</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-select-small">Sub Category</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={productView.productviewsubcat}
                                    onChange={(e) => { setProductView({ ...productView, Productviewsubcat: e.target.value }) }}
                                    label="Sub Category"
                                >
                                    <MenuItem value="">
                                        <em>Please Select</em>
                                    </MenuItem>
                                    <MenuItem value={1}>yyy</MenuItem>
                                    <MenuItem value={2}>xxx</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl size="small" fullWidth>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Business Location"
                                            placeholder="Favorites"
                                        />
                                    )}
                                    size="small" fullWidth
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormGroup>
                                <span><FormControlLabel control={<Checkbox defaultChecked />} label="Manage Stock" />
                                    <Tooltip title="Enable or disable stock management for a product. Stock Management should be disable mostly for services. Example: Hair-Cutting, Repairing, etc." placement="top">
                                        <IconButton>
                                            <FcInfo />
                                        </IconButton>
                                    </Tooltip>
                                </span>
                            </FormGroup>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Alert Quantity</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    endAdornment={
                                        <Tooltip title="Get alert when product stock reaches or goes below the specified quantity. Products with low stock will be displayed in dashboard - Product Stock Alert section." placement="top">
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    value={productView.productviewalert}
                                                    onChange={(e) => { setProductView({ ...productView, Productviewalert: e.target.value }) }}
                                                >
                                                    <FcInfo />
                                                </IconButton>
                                            </InputAdornment>
                                        </Tooltip>
                                    }
                                    label="Alert quantity "
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl size="small" fullWidth>
                                <Button
                                    component="label"
                                    sx={prodStyle.prod_uploadbtn}
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                                <Typography variant='body2' sx={{ opacity: '0.9', mt: 1 }}>Max File size: 5MB</Typography>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}></Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <MUIEditor editorState={editorState} onChange={onChange} />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <FormControl size="small" fullWidth>
                                <Button
                                    sx={prodStyle.prod_uploadbtn}
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                                <Typography variant='body2' sx={{ opacity: '0.9', mt: 1 }}>
                                    Max File size: 5MB <br />
                                    Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-select-small">Applicable Tax</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={productView.productviewapplicable}
                                    onChange={(e) => { setProductView({ ...productView, Productviewapplicable: e.target.value }) }}
                                    label="Applicable Tax"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>yyy</MenuItem>
                                    <MenuItem value={2}>xxx</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-select-small">Selling Price Tax Type *</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={productView.productviewsellingtax}
                                    onChange={(e) => { setProductView({ ...productView, Productviewsellingtax: e.target.value }) }}
                                    label="Selling Price Tax Type"
                                >
                                    <MenuItem value="">
                                        Exclusive
                                    </MenuItem>
                                    <MenuItem value={1}>Inclusive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Product Type *</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    endAdornment={
                                        <Tooltip title="Single product: Product with no variations.
                Variable product: Product with variations such as size, color etc.
                Combo product: A combination of multiple products, also called bundle product" placement="top">
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    value={productView.productviewproducttype}
                                                    onChange={(e) => { setProductView({ ...productView, Productviewproducttype: e.target.value }) }}
                                                >
                                                    <FcInfo />
                                                </IconButton>
                                            </InputAdornment>
                                        </Tooltip>
                                    }
                                    label="Product Type *"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} >
                            <TableContainer component={Paper} fullWidth>
                                <Table aria-label="simple table " sx={{ borderBlock: '1px solid #b97fd0' }} fullWidth>
                                    <TableHead fullWidth>
                                        <TableRow fullWidth>
                                            <TableCell sx={prodStyle.prod_tablehd} align="center" colSpan={2} fullWidth>Default Purchase Price</TableCell>
                                            <TableCell sx={prodStyle.prod_tablehd} align="center" fullWidth>x Margin (%)
                                                <Tooltip sx={{ zIndex: '1' }} title="Single product: Product with no variations.
                Variable product: Product with variations such as size, color etc.
                Combo product: A combination of multiple products, also called bundle product" placement="top">
                                                    <IconButton>
                                                        <FcInfo />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell sx={prodStyle.prod_tablehd} align="center" fullWidth>Default Selling Price</TableCell>
                                            <TableCell sx={prodStyle.prod_tablehd} align="center" fullWidth>Product image</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody fullWidth>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} fullWidth>
                                            <TableCell component="th" scope="row" fullWidth>
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel htmlFor="component-outlined">Exc. tax *</InputLabel>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        value={productView.productviewexc}
                                                        onChange={(e) => { setProductView({ ...productView, Productviewexc: e.target.value }) }}
                                                        label="Exc. tax *"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center" fullWidth>
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel htmlFor="component-outlined">Inc. tax *</InputLabel>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        value={productView.productviewinc}
                                                        onChange={(e) => { setProductView({ ...productView, Productviewinc: e.target.value }) }}
                                                        label="Inc. tax *"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center" fullWidth>
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel htmlFor="component-outlined"></InputLabel>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        value={productView.productviewmarg}
                                                        onChange={(e) => { setProductView({ ...productView, Productviewmarg: e.target.value }) }}
                                                        label="Marg"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center" fullWidth>
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel htmlFor="component-outlined">Exc. tax *</InputLabel>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        value={productView.productviewexctax}
                                                        onChange={(e) => { setProductView({ ...productView, Productviewexctax: e.target.value }) }}
                                                        label="Exc. tax *"
                                                    />
                                                </FormControl>
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel htmlFor="component-outlined">Inc. tax *</InputLabel>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        value={productView.productviewinctax}
                                                        onChange={(e) => { setProductView({ ...productView, Productviewinctax: e.target.value }) }}
                                                        label="Inc. tax *"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center" fullWidth>
                                                <Button
                                                    sx={prodStyle.prod_uploadbtn}
                                                >
                                                    Upload Image
                                                    <input
                                                        type="file"
                                                        hidden
                                                    />
                                                </Button>
                                                <Typography variant='body2' sx={{ opacity: '0.9', mt: 1 }}>Max File size: 5MB</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid container sx={prodStyle.prod_grid_container}>
                            <Grid >
                                <Button sx={prodStyle.prod_saveadd}>Save And Add Another </Button>
                                <Button sx={prodStyle.prod_save}>Save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </form>

            {/************* Modal *************/}
            {/************* Unit Modal *************/}
            <div>
                <BootstrapDialog
                    onClose={handleClose1}
                    aria-labelledby="customized-dialog-title1"
                    open={unitmodal}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid #b97df0',
                        },
                        '& .MuiDialog-paper': {
                            marginTop: '-400px',
                            transformOrigin: '0 0 0'
                        }
                    }}
                >
                    <BootstrapDialogTitle id="customized-dialog-title1" onClose={handleClose1}>
                        Add Unit
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel htmlFor="component-outlined">Product Name *</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={productViewUnitMod.productviewunitprodname}
                                        onChange={(e) => { setProductViewUnitMod({ ...productViewUnitMod, Productviewunitprodname: e.target.value }) }}
                                        label="Product Name"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel htmlFor="component-outlined">Short Name</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={productViewUnitMod.productviewunitshortname}
                                        onChange={(e) => { setProductViewUnitMod({ ...productViewUnitMod, Productviewshortprodname: e.target.value }) }}
                                        label="Short Name"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="demo-select-small">Allow decimal *</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={productViewUnitMod.productviewunitallow}
                                        onChange={(e) => { setProductViewUnitMod({ ...productViewUnitMod, Productviewunitallow: e.target.value }) }}
                                        label="Allow decimal"
                                    >
                                        <MenuItem value="">
                                            <em>Please Select</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={2}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus variant='contained' color="success">
                            Save
                        </Button>
                        <Button onClick={handleClose1} variant='contained' color="error">Close</Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>

            {/************* Brand Modal *************/}
            <div >
                <BootstrapDialog
                    onClose={handleClose2}
                    aria-labelledby="customized-dialog-title"
                    open={brandmodal}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid #b97df0',
                        },
                        '& .MuiDialog-paper': {
                            marginTop: '-470px',
                            transformOrigin: '0 0 0'
                        }
                    }}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose2}>
                        Add Brand
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel htmlFor="component-outlined">Brand Name *</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={productViewBrandMod.prodviewBrdModBrdName}
                                        onChange={(e) => { setProductViewBrandMod({ ...productViewBrandMod, ProdviewBrdModBrdName: e.target.value }) }}
                                        label="Brand Name *"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel htmlFor="component-outlined">Short Description</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={productViewBrandMod.prodViewBrdModShortDes}
                                        onChange={(e) => { setProductViewBrandMod({ ...productViewBrandMod, ProdviewBrdModShortDes: e.target.value }) }}
                                        label="Short Description"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus variant='contained' color="success">Save</Button>
                        <Button onClick={handleClose2} variant='contained' color="error">Close</Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
            <br /> <br />
        </Box>
    );
}

export default Productview;
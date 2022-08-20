import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Typography,Container,Select,Checkbox,FormControl,MenuItem, Grid, InputLabel, Box, Button,
   Menu,TableSortLabel,Tooltip,Avatar,Divider,Toolbar,Table,TableBody,
   TableCell,TableContainer,TableHead,TableRow,Paper,Dialog,DialogTitle,
   DialogContent,DialogActions,tableCellClasses} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { FaFileCsv, FaPrint, FaFilePdf, FaEdit, FaEye, FaTrash, 
  FaDatabase, FaHistory, FaCopy, FaBarcode,} from "react-icons/fa";
import { AiFillFileExcel } from "react-icons/ai";
import { visuallyHidden } from "@mui/utils";
// import {commonstyle} from "./Commonstyle";
import {FcInfo} from "react-icons/fc";
import {Link} from "react-router-dom";
import {prodStyle, prodList} from "./ProductStyle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//Actions Dropdown Button - List 
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 150,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      fontSize: 14,
      "& .MuiSvgIcon-root": {
        fontSize: 15,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

//All Products Table createData function
function createData( productimage, action, product, businesslocation, upprice, 
  sprice, currentstock, producttype, category, brand, tax, sku, cf1, cf2, cf3, cf4)
   {
  return { productimage, action, product, businesslocation, upprice, 
    sprice, currentstock, producttype, category, brand, tax, sku, cf1, cf2, cf3, cf4,
  };
}

//All Products Table rows 
const rows = [
  createData( "dfgh", "", "Cupcake1", "Cupcake2", "Cupcake3", "Cupcake4", "Cupcake5", 
  "Cupcake6", "Cupcake7", "Cupcake8", "Cupcake9", 67, 4.3, 69, 46, 78, 89),
  createData( "efgh", "", "Chocolate", "Cake2", "Cake3", "Cake4", "Cake5", "Cake6", "Cake7", 
  "Cake8", "Cake9", 97, 9.3, 99, 96, 98, 99),
  createData( "jfgh", "", "Cake1", "Cake2", "Cake3", "Cake4", "Cake5", "Cake6", "Cake7", 
  "Cake8", "Cake9", 37, 3.3, 39, 36, 38, 39),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "productimage", numeric: false, disablePadding: true, label: "", },
  { id: "action", numeric: false, disablePadding: true, label: "Action", },
  { id: "product", numeric: false, disablePadding: false, label: "Product", },
  { id: "businesslocation", numeric: false, disablePadding: false, label: "Business Location" , },
  { id: "upprice", numeric: false, disablePadding: false, label: "Unit Purchase Price", },
  { id: "sprice", numeric: false, disablePadding: false, label: "Selling Price", },
  { id: "currentstock", numeric: false, disablePadding: false, label: "Current Stock", },
  { id: "producttype", numeric: false, disablePadding: false, label: "Product Type", },
  { id: "category", numeric: false, disablePadding: false, label: "Category", },
  { id: "brand", numeric: false, disablePadding: false, label: "Brand", },
  { id: "tax", numeric: false, disablePadding: false, label: "Tax", },
  { id: "sku", numeric: true, disablePadding: false, label: "SKU", },
  { id: "cf1", numeric: true, disablePadding: false, label: "Custom Field1", },
  { id: "cf2", numeric: true, disablePadding: false, label: "Custom Field2", },
  { id: "cf3", numeric: true, disablePadding: false, label: "Custom Field3", },
  { id: "cf4", numeric: true, disablePadding: false, label: "Custom Field4", },
];

// All Products Table Head function
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,} = props;
  const createSortHandler = (property) => (event) => {onRequestSort(event, property); };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              fontWeight: "600",
              fontSize: "14px",
              color: "black",
              // '@media (max-width: 400px)':{

              // }
            }}
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.secondary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%", fontSize: "20px" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">  <IconButton> <DeleteIcon /> </IconButton>  </Tooltip>
      ) : (
        null
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



// Table 2 - Stock Report - Row creation function
function createData2( sr_sku, sr_product, sr_location, sr_unitprice, sr_currentstock, 
  sr_currentstock_pp, sr_currentstock_sp, sr_potentialprofit, sr_totalunitsold, 
  sr_totalunittransferred, sr_totalunitadjusted) 
  {
  return { sr_sku, sr_product, sr_location, sr_unitprice, sr_currentstock, 
    sr_currentstock_pp, sr_currentstock_sp, sr_potentialprofit, sr_totalunitsold, 
    sr_totalunittransferred, sr_totalunitadjusted,
  };
}

const rows2 = [
  createData2( "Frozen yoghurt", 159, 6.0, 24, 4.0, "Frozen yoghurt", 159, 6.0, 24, 4.0, 78 ),
  createData2( "Ice cream sandwich", 237, 9.0, 37, 4.3, "Ice cream sandwich", 237, 9.0, 37, 4.3, 79 ),
];

//View Group Prices Modal Tags
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '@media (max-width: 667px)':{
    minWidth: 450,
    "&. MuiDialog-paper":{
      overflow: "hidden",
    },
  },
  '@media (max-width: 516px)':{
    minWidth:350,
    "&. MuiDialog-paper":{
      overflow: "hidden",
      minWidth:350,
    },
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),

  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2,
    //   '@media (max-width: 667px)':{
    //     maxWidth: 400,
    //     overflow: "hidden",
    // },
     }} 
     {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
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


// Accordion style
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: 0,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

// Accordion Header Style
const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor: "white",

    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

// Accordion Body Style
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));


export default function CustomizedAccordions() {

// Filter - All Select Inputs
  const [productFilter, setProductFilter] = useState({ProductType: "",Category: "",Unit:"",Tax:"",Brand:"",BusinessLocation:"",Status:""})

// Table 1 - All Products
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("product");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.product);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, product) => {
    const selectedIndex = selected.indexOf(product);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };

  const isSelected = (product) => selected.indexOf(product) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick_action = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


// Table 1 - Plugin
  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable({
        language: { search: "", searchPlaceholder: "Search..." },
        lengthMenu: [25, 50, 100, 200, 500, 1000],
        retrieve: true,
      });
    }, 1000);
  });



// Accordion expand  
  const [expanded, setExpanded] = useState("panel1");

  const handleChangePanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [TabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

// Table 2 - Plugin
  $(document).ready(function () {
    setTimeout(function () {
      $("#example2").DataTable({
        language: { search: "", searchPlaceholder: "Search..." },
        lengthMenu: [25, 50, 100, 200, 500, 1000],
        paging: true,
      });
    }, 1000);
  });

// Stock Report Table Modal
  const [ModalOpen, setModalOpen] = useState(false);

  const handleClickModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <Container sx={{ paddingTop: '10px' }}>
                <Grid display="flex">
                    <Typography variant="h5" >Products</Typography>
                    <Typography variant='body2' sx={{ marginLeft: '10px', marginTop: '10px' }}>
                      Manage your products</Typography>
                </Grid>
            </Container>
            <br />

      {/* *****Filters Grid***** */}

    <Container>
      <Grid>
        <Grid  fullWidth sx={{ '& .MuiGrid-root':{
          paddingRight: 0,paddingLeft: 0,        }}}>
          <Accordion
            expanded={expanded === "panel1"} onChange={handleChangePanel("panel1")}
            sx={ prodStyle.prod_container}
          >
            <AccordionSummary
              aria-controls="panel1d-content" id="panel1d-header"
            >
              <Typography sx={{ color: " #7009AB" }}>
                <FilterAltIcon /> Filter
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid  item  md={3}  sm={6}  xs={10} sx={prodList.select_input} >
                  <Typography>
                    <FormControl sx={ prodList.select_formcontrol } size="small" fullWidth >
                      <InputLabel id="demo-select-small">Product Type </InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={productFilter.ProductType}
                        label="Product Type"
                        onChange={(event) => {
                          setProductFilter({...productFilter, ProductType: event.target.value})
                        }}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"single"}>Single</MenuItem>
                        <MenuItem value={"variable"}>Variable</MenuItem>
                        <MenuItem value={"combo"}>Combo</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10} sx={prodList.select_input} >
                  <Typography>
                  <FormControl sx={ prodList.select_formcontrol } size="small" fullWidth >
                      <InputLabel id="demo-select-small">Category</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={productFilter.Category}
                        label="Category"
                        onChange={(event) => {
                          setProductFilter({...productFilter, Category: event.target.value})
                        }}
                      >
                        <MenuItem value="category_all">All</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10} sx={prodList.select_input} >
                  <Typography>
                  <FormControl sx={ prodList.select_formcontrol } size="small" fullWidth >
                      <InputLabel id="demo-select-small">Unit</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={productFilter.Unit}
                        label="Unit"
                        onChange={(event) => {
                          setProductFilter({...productFilter, Unit: event.target.value})
                        }}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"pieces"}>Pieces (Pc(s))</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10} sx={prodList.select_input} >
                  <Typography>
                  <FormControl sx={  prodList.select_formcontrol } size="small" fullWidth >
                      <InputLabel id="demo-select-small">Tax</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={productFilter.Tax}
                        label="Tax"
                        onChange={(event) => {
                          setProductFilter({...productFilter, Tax: event.target.value})
                        }}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"gst"}>GST</MenuItem>
                        <MenuItem value={"cgst"}>CGST</MenuItem>
                        <MenuItem value={"tax"}>Tax</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10} sx={prodList.select_input} >
                  <Typography>
                  <FormControl sx={  prodList.select_formcontrol } size="small" fullWidth >
                      <InputLabel id="demo-select-small">Brand</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={productFilter.Brand}
                        label="Brand"
                        onChange={(event) => {
                          setProductFilter({...productFilter, Brand: event.target.value})
                        }}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"motog"}>MotoG</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10} sx={prodList.select_input} >
                  <Typography>
                    <FormControl sx={  prodList.select_formcontrol } size="small" fullWidth >
                      <InputLabel id="demo-select-small">
                        Business Location 
                      </InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={productFilter.BusinessLocation}
                        label="Business Location"
                        onChange={(event) => {
                          setProductFilter({...productFilter, BusinessLocation: event.target.value})
                        }}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"none"}>None</MenuItem>
                        <MenuItem value={"xyz"}>XYZ (123456)</MenuItem>
                        <MenuItem value={"juiceria"}>
                          Juiceria (1234567)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10} sx={prodList.select_input} >
                  <Typography>
                  <FormControl sx={  prodList.select_formcontrol } size="small" fullWidth >
                      <Select  value={productFilter.Status}   onChange={(event) => {
                          setProductFilter({...productFilter, Status: event.target.value})
                        }}  displayEmpty >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"inactive"}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid item md={3} sm={6} xs={10}>
                  <Typography>
                    <FormControl sx={{ m: 1 }} size="small" fullWidth>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                          />
                        }
                        label="Not for selling"
                      />
                    </FormControl>
                  </Typography>
                </Grid>
                
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/* ********Tabs Grid******** */}

      <>
<br />
<br />
      <Grid sx={ prodStyle.prod_container } >
        <Box sx={{ typography: "body1" }}>
          <TabContext value={TabValue}>
            <Box>
              <TabList onChange={handleTabChange} aria-label="Tabs">
                <Tab icon={<ViewInArIcon />} iconPosition="start" label="All Products" 
                value="1" sx={prodList.tab}
                />
                <Tab icon={<HourglassFullIcon />} iconPosition="start" label="Stock Report" 
                value="2" sx={prodList.tab}
                />
              </TabList>
            </Box>
            <TabPanel value="1" sx={prodList.tabpanel}>
              <>
                <br />
                <Button variant="contained" sx={prodList.add} >
                  <Link to="addproduct" >
                  <span><AddIcon />  Add </span>
                  </Link>
                </Button>
                <Box sx={{ width: "100%" }}>
                  <Paper sx={{ width: "100%", mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />

             {/* All Products Table */}

                    <TableContainer sx={{ padding: 3 }}>
                      <Grid container sx={{ justifyContent: "center",}} >
                        <Grid>
                          <Button sx={prodList.button_grp} variant="outlined">
                            <FaFileCsv />&ensp;Export to CSV
                          </Button>
                          <Button sx={prodList.button_grp} variant="outlined">
                            <AiFillFileExcel />&ensp;Export to Excel
                          </Button>
                          <Button sx={prodList.button_grp} variant="outlined">
                            <FaPrint />&ensp;Print
                          </Button>
                          <Button sx={prodList.button_grp} variant="outlined">
                            <FaFilePdf />&ensp;Export to PDF
                          </Button>
                        </Grid>
                      </Grid>
                      <Table
                        id="example"
                        sx={{ minWidth: 750 ,pr: 1 }}
                        aria-labelledby="tableTitle"
                      >
                        <EnhancedTableHead
                          numSelected={selected.length} order={order} orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort}
                          rowCount={rows.length}
                        />
                        <TableBody>
                          {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.product);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <StyledTableRow
                                  hover
                                  onClick={(event) => handleClick(event, row.product)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.product}
                                  selected={isItemSelected}
                                  align="center"
                                >
                                  <StyledTableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    <Avatar
                                      sx={{ backgroundColor: "#cdcdcd" }}
                                      variant="square"
                                    ></Avatar>
                                  </StyledTableCell>

                     {/* Actions Dropdown Button */}

                                  <StyledTableCell>
                                  <Button
                                      id="demo-customized-button"
                                      aria-controls={open ? "demo-customized-menu" : undefined}
                                      aria-haspopup="true"
                                      aria-expanded={open ? "true" : undefined}
                                      variant="contained"
                                      disableElevation
                                      onClick={handleClick_action}
                                      endIcon={<KeyboardArrowDownIcon />}
                                      size="small"
                                      sx={prodList.actionsdropdown}
                                    >
                                      Actions
                                    </Button>

                    {/* Actions Dropdown Button - List */}

                                    <StyledMenu
                                      id="demo-customized-menu"
                                      MenuListProps={{
                                        "aria-labelledby": "demo-customized-button",
                                      }}
                                      anchorEl={anchorEl} open={open} onClose={handleClose}
                                    >
                                      <MenuItem >
                                        <FaBarcode /> &nbsp; &nbsp; &nbsp;Labels
                                      </MenuItem>
                                      <MenuItem >
                                      <Link to="viewproduct" >
                                        <FaEye />
                                        &nbsp; &nbsp; &nbsp; View
                                        </Link>
                                      </MenuItem>
                                      <MenuItem>
                                      <Link to="editproduct" >
                                         <FaEdit /> &nbsp;&nbsp; &nbsp; Edit 
                                         </Link>
                                      </MenuItem>
                                      <MenuItem >
                                        <FaTrash /> &nbsp;&nbsp; &nbsp; Delete
                                      </MenuItem>
                                      <Divider sx={{ my: 2 }} />
                                      <MenuItem >
                                        <FaDatabase /> &nbsp;&nbsp; &nbsp; Add or edit opening stock
                                      </MenuItem>
                                      <MenuItem>
                                        <FaHistory /> &nbsp; &nbsp; &nbsp;Product stock history
                                      </MenuItem>
                                      <MenuItem >
                                        <FaCopy /> &nbsp; &nbsp; &nbsp;Duplicate Product
                                      </MenuItem>
                                    </StyledMenu>
                                  </StyledTableCell>
                                  <StyledTableCell>{row.product}</StyledTableCell>
                                  <StyledTableCell>{row.businesslocation}</StyledTableCell>
                                  <StyledTableCell>{row.upprice}</StyledTableCell>
                                  <StyledTableCell>{row.sprice}</StyledTableCell>
                                  <StyledTableCell>{row.currentstock}</StyledTableCell>
                                  <StyledTableCell>{row.producttype}</StyledTableCell>
                                  <StyledTableCell>{row.category}</StyledTableCell>
                                  <StyledTableCell>{row.brand}</StyledTableCell>
                                  <StyledTableCell>{row.tax}</StyledTableCell>
                                  <StyledTableCell>{row.sku}</StyledTableCell>
                                  <StyledTableCell>{row.cf1}</StyledTableCell>
                                  <StyledTableCell>{row.cf2}</StyledTableCell>
                                  <StyledTableCell>{row.cf3}</StyledTableCell>
                                  <StyledTableCell>{row.cf4}</StyledTableCell>
                                </StyledTableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                      <br />
                      <Button  variant="contained"  size="small"  sx={prodList.delete_btn} >
                        Delete Selected 
                      </Button>&nbsp;
                      <Button  variant="contained"  size="small"  sx={prodList.addtolocation_btn} >
                        Add to location
                      </Button>&nbsp;
                      <Button  variant="contained"  size="small"  sx={prodList.remove_btn} >
                        Remove from location
                      </Button>&nbsp;
                      <Button  variant="contained"  size="small"  sx={prodList.deactive_btn} >
                        Deactivate Selected
                      </Button>
                      <sup>
                      <Tooltip title="Deactivated products will not be available for purchase or sell">
                        <IconButton>
                          <FcInfo  sx={{marginTop:'-25px'}} />
                        </IconButton>  
                      </Tooltip>
                      </sup>
                    </TableContainer>

             {/* All Products Table Ends */}

                  </Paper>
                </Box>
              </>
            </TabPanel>

              {/* *****Stock Report***** */}

            <TabPanel value="2" sx={prodList.tabpanel}>
              <>

         {/* Stock Report Table */}

              <TableContainer component={Paper} sx={{ padding: 3 }}>
                <Grid container sx={{ justifyContent: "center",}} >
                    <Grid>
                      <Button sx={prodList.button_grp}>
                        <FaFileCsv />&ensp;Export to CSV
                      </Button>
                      <Button sx={prodList.button_grp}>
                        <AiFillFileExcel />&ensp;Export to Excel
                      </Button>
                      <Button sx={prodList.button_grp}>
                        <FaPrint />&ensp;Print
                      </Button>
                      <Button sx={prodList.button_grp}>
                        <FaFilePdf />&ensp;Export to PDF
                      </Button>
                    </Grid>
                  </Grid>
                  
                  <Table id="example2" sx={{}} aria-label="Stock Report Table">
                    <TableHead sx={{ fontWeight: "600", fontSize: "14px" }}>
                      <TableRow>
                        <TableCell >SKU</TableCell>
                        <TableCell >Product</TableCell>
                        <TableCell >Location</TableCell>
                        <TableCell sx={{  width: 250 }}>Unit Price</TableCell>
                        <TableCell >Current Stock</TableCell>
                        <TableCell sx={{  width: 180 }}>Current Stock Value (By purchase price)</TableCell>
                        <TableCell sx={{  width: 180 }}>Current Stock Value (By sale price)</TableCell>
                        <TableCell >Potential Profit</TableCell>
                        <TableCell >Total Unit Sold</TableCell>
                        <TableCell >Total Unit Tranferred</TableCell>
                        <TableCell >Total Unit Adjusted</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows2.map((row) => (
                        <StyledTableRow key={row.sr_sku} >
                          <StyledTableCell component="th" scope="row">{row.sr_sku}</StyledTableCell>
                          <StyledTableCell>{row.sr_product}</StyledTableCell>
                          <StyledTableCell>{row.sr_location}</StyledTableCell>
                          <StyledTableCell>
                            {row.sr_unitprice}
                            <br />

                  {/* View Group Prices Modal */}

                            <Button  variant="outlined"  onClick={handleClickModalOpen}  
                            size="small"  sx={prodList.viewbtn} >
                              View group prices
                            </Button>
                            <BootstrapDialog
                              onClose={handleModalClose}
                              aria-labelledby="customized-dialog-title"
                              open={ModalOpen}
                              sx={{
                                "& .MuiDialog-paper": {
                                  marginTop: "-330px",
                                  transformOrigin: "0 0 0",            
                                },
                              }}
                            >
                              <BootstrapDialogTitle
                                id="customized-dialog-title"
                                onClose={handleModalClose}
                                sx={{ width: 450, overflow: "hidden",
                                '@media (max-width: 516px)':{
                                  width:390,
                                },
                                '@media (max-width: 456px)':{
                                  width:340,
                                },
                                '@media (max-width: 407px)':{
                                  width:320,
                                },
                                '@media (max-width: 385px)':{
                                  width:290,
                                },
                               }}
                              >
                                Product
                              </BootstrapDialogTitle>
                              <DialogContent dividers>
                                <Table>
                                  <TableRow sx={{ backgroundColor: "#2dce89", m: 0, p: 0 }}>
                                    <TableCell sx={{ color: "#fff" }}>
                                      Default Selling Price (Inc. tax)
                                    </TableCell>
                                  </TableRow>
                                  <TableRow sx={{ backgroundColor: "#d2d6de" }}>
                                    <TableCell>₹ 2,343.75</TableCell>
                                  </TableRow>
                                </Table>
                                <br />
                              </DialogContent>
                              <DialogActions>
                                <Button  autoFocus  onClick={handleModalClose}  variant="outlined"
                                  sx={{
                                    backgroundColor: "#f4f4f4",
                                    borderColor: "#ddd",
                                    color: "#444",
                                  }}
                                >
                                  Close
                                </Button>
                              </DialogActions>
                            </BootstrapDialog>
                          </StyledTableCell>

                {/* View Group Prices Modal Ends */}

                          <StyledTableCell>{row.sr_currentstock}</StyledTableCell>
                          <StyledTableCell>{row.sr_currentstock_pp}</StyledTableCell>
                          <StyledTableCell>{row.sr_currentstock_sp}</StyledTableCell>
                          <StyledTableCell>{row.sr_potentialprofit}</StyledTableCell>
                          <StyledTableCell>{row.sr_totalunitsold}</StyledTableCell>
                          <StyledTableCell>{row.sr_totalunittransferred}</StyledTableCell>
                          <StyledTableCell>{row.sr_totalunitadjusted}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                      {/* <TableRow className="table2_total">
                        <TableCell
                          colSpan={4}
                          align="center"
                          sx={{ fontWeight: 700, fontSize: 18, color: "black" }}
                        >
                          Total:{" "}
                        </TableCell>
                        <TableCell sx={{ color: "black", fontSize: 16 }}>18.00</TableCell>
                        <TableCell sx={{ color: "black", fontSize: 16 }}>
                          ₹ 30,078.16
                        </TableCell>
                        <TableCell sx={{ color: "black", fontSize: 16 }}>
                          ₹ 46,687.50
                        </TableCell>
                        <TableCell sx={{ color: "black", fontSize: 16 }}>
                          ₹ 16,609.34
                        </TableCell>
                        <TableCell sx={{ color: "black", fontSize: 16 }}>13.00</TableCell>
                        <TableCell sx={{ color: "black", fontSize: 16 }}>0.00</TableCell>
                        <TableCell sx={{ color: "black", fontSize: 16 }}>0.00</TableCell>
                      </TableRow> */}
                    </TableBody>
                  </Table>
                </TableContainer>

         {/* Stock Report Table Ends*/}

              </>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
      </>
      </Container>
    </Box>
  );
}
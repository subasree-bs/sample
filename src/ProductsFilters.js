import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {Select,Checkbox,FormControl,MenuItem, Grid, InputLabel, Box, Button,
   Menu,TableSortLabel,Tooltip,Avatar,Divider,Toolbar,Table,TableBody,
   TableCell,TableContainer,TableHead,TableRow,Paper,Dialog,DialogTitle,
   DialogContent,DialogActions} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./styles.css";
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

function createData( productimage, action, product, businesslocation, upprice, 
  sprice, currentstock, producttype, category, brand, tax, sku, cf1, cf2, cf3, cf4)
   {
  return { productimage, action, product, businesslocation, upprice, 
    sprice, currentstock, producttype, category, brand, tax, sku, cf1, cf2, cf3, cf4,
  };
}

const rows = [
  createData( "dfgh", "", "Cupcake1", "Cupcake2", "Cupcake3", "Cupcake4", "Cupcake5", 
  "Cupcake6", "Cupcake7", "Cupcake8", "Cupcake9", 67, 4.3, 69, 46, 78, 89),
  createData( "dfgh", "", "Cupcake1", "Cupcake2", "Cupcake3", "Cupcake4", "Cupcake5", 
  "Cupcake6", "Cupcake7", "Cupcake8", "Cupcake9", 77, 7.3, 79, 76, 78, 79),
  createData( "dfgh", "", "Cupcake1", "Cupcake2", "Cupcake3", "Cupcake4", "Cupcake5", 
  "Cupcake6", "Cupcake7", "Cupcake8", "Cupcake9", 27, 2.3, 29, 26, 28, 29),
  createData( "dfgh", "", "Cupcake1", "Cupcake2", "Cupcake3", "Cupcake4", "Cupcake5", 
  "Cupcake6", "Cupcake7", "Cupcake8", "Cupcake9", 47, 4.3, 49, 46, 48, 49),
  createData( "dfgh", "", "Cake1", "Cake2", "Cake3", "Cake4", "Cake5", "Cake6", "Cake7", 
  "Cake8", "Cake9", 97, 9.3, 99, 96, 98, 99),
  createData( "dfgh", "", "Cake1", "Cake2", "Cake3", "Cake4", "Cake5", "Cake6", "Cake7", 
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
  {
    id: "productimage",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
  {
    id: "product",
    numeric: false,
    disablePadding: false,
    label: "Product",
  },
  {
    id: "businesslocation",
    numeric: false,
    disablePadding: false,
    label: "Business Location",
  },
  {
    id: "upprice",
    numeric: false,
    disablePadding: false,
    label: "Unit Purchase Price",
  },
  {
    id: "sprice",
    numeric: false,
    disablePadding: false,
    label: "Selling Price",
  },
  {
    id: "currentstock",
    numeric: false,
    disablePadding: false,
    label: "Current Stock",
  },
  {
    id: "producttype",
    numeric: false,
    disablePadding: false,
    label: "Product Type",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "brand",
    numeric: false,
    disablePadding: false,
    label: "Brand",
  },
  {
    id: "tax",
    numeric: false,
    disablePadding: false,
    label: "Tax",
  },
  {
    id: "sku",
    numeric: true,
    disablePadding: false,
    label: "SKU",
  },
  {
    id: "cf1",
    numeric: true,
    disablePadding: false,
    label: "Custom Field1",
  },
  {
    id: "cf2",
    numeric: true,
    disablePadding: false,
    label: "Custom Field2",
  },
  {
    id: "cf3",
    numeric: true,
    disablePadding: false,
    label: "Custom Field3",
  },
  {
    id: "cf4",
    numeric: true,
    disablePadding: false,
    label: "Custom Field4",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              fontWeight: "600",
              fontSize: "14px",
              color: "black",
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
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton></IconButton>
        </Tooltip>
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
  createData2(
    "Frozen yoghurt",
    159,
    6.0,
    24,
    4.0,
    "Frozen yoghurt",
    159,
    6.0,
    24,
    4.0,
    78
  ),
  createData2(
    "Ice cream sandwich",
    237,
    9.0,
    37,
    4.3,
    "Ice cream sandwich",
    237,
    9.0,
    37,
    4.3,
    79
  ),
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
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


// Accordion style
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
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

// Table 1 - All Products
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
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
      const newSelected = rows.map((n) => n.productimage);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick_action = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



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

// Select-ProductType
  const [ProductType, setProductType] = useState("");

  const handleChange1 = (event) => {
    setProductType(event.target.value);
  };

// Select-Category
  const [Category, setCategory] = useState("");

  const handleChange2 = (event) => {
    setCategory(event.target.value);
  };

// Select-Unit
  const [Unit, setUnit] = useState("");

  const handleChange3 = (event) => {
    setUnit(event.target.value);
  };

// Select-Tax
  const [Tax, setTax] = useState("");

  const handleChange4 = (event) => {
    setTax(event.target.value);
  };

// Select-Brand
  const [Brand, setBrand] = useState("");

  const handleChange5 = (event) => {
    setBrand(event.target.value);
  };

// Select-BusinessLocation
  const [BusinessLocation, setBusinessLocation] = useState("");

  const handleChange6 = (event) => {
    setBusinessLocation(event.target.value);
  };

// Select-Status
  const [Status, setStatus] = useState("");

  const handleChange7 = (event) => {
    setStatus(event.target.value);
  };

  const [TabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  $(document).ready(function () {
    setTimeout(function () {
      $("#example2").DataTable({
        language: { search: "", searchPlaceholder: "Search..." },
        lengthMenu: [25, 50, 100, 200, 500, 1000],
        paging: true,
      });
    }, 1000);
  });

  const [ModalOpen, setModalOpen] = useState(false);

  const handleClickModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ p: 3 }}>
        Products &nbsp;
        <span className="product_title_span">Manage your products </span>
      </Typography>

      {/* *****Filters Grid***** */}

      <Grid>
        <Grid sx={{ pl: 3, pr: 3 }} fullWidth>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChangePanel("panel1")}
            sx={{ margin: "10px", bgcolor: "#fff", height: "auto", padding: "3px", 
            borderTop: "5px solid #7009AB;", borderRadius: "10px", boxShadow: "6px 6px 6px 6px #dedbdbae",
            }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography sx={{ color: " #7009AB" }}>
                <FilterAltIcon /> Filter
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid  item  md={3}  sm={6}  xs={10}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #B97DF0",
                    },
                  }}
                >
                  <Typography>
                    <FormControl
                      sx={{
                        m: 1,
                        borderRadius: 2,
                      }}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-select-small">
                        Product Type
                      </InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={ProductType}
                        label="Product Type"
                        onChange={handleChange1}
                        autoFocus="true"
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"single"}>Single</MenuItem>
                        <MenuItem value={"variable"}>Variable</MenuItem>
                        <MenuItem value={"combo"}>Combo</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #B97DF0",
                    },
                  }}
                >
                  <Typography>
                    <FormControl
                      sx={{
                        m: 1,
                        borderRadius: 2,
                      }}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-select-small">Category</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={Category}
                        label="Category"
                        onChange={handleChange2}
                      >
                        <MenuItem value="category_all">All</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #B97DF0",
                    },
                  }}
                >
                  <Typography>
                    <FormControl
                      sx={{
                        m: 1,
                        borderRadius: 2,
                      }}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-select-small">Unit</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={Unit}
                        label="Unit"
                        onChange={handleChange3}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"pieces"}>Pieces (Pc(s))</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #B97DF0",
                    },
                  }}
                >
                  <Typography>
                    <FormControl
                      sx={{
                        m: 1,
                        borderRadius: 2,
                      }}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-select-small">Tax</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={Tax}
                        label="Tax"
                        onChange={handleChange4}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"gst"}>GST</MenuItem>
                        <MenuItem value={"cgst"}>CGST</MenuItem>
                        <MenuItem value={"tax"}>Tax</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #B97DF0",
                    },
                  }}
                >
                  <Typography>
                    <FormControl
                      sx={{
                        m: 1,
                        borderRadius: 2,
                      }}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-select-small">Brand</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={Brand}
                        label="Brand"
                        onChange={handleChange5}
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={"motog"}>MotoG</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>

                <Grid  item  md={3}  sm={6}  xs={10}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #B97DF0",
                    },
                  }}
                >
                  <Typography>
                    <FormControl
                      sx={{
                        m: 1,
                        borderRadius: 2,
                      }}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-select-small">
                        Business Location
                      </InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={BusinessLocation}
                        label="Business Location"
                        onChange={handleChange6}
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
                <Grid  item  md={3}  sm={6}  xs={10}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #B97DF0",
                    },
                  }}
                >
                  <Typography>
                    <FormControl
                      sx={{
                        m: 1,
                        minWidth: 120,
                        borderRadius: 2,
                      }}
                      size="small"
                      fullWidth
                    >
                      <Select
                        value={Status}
                        onChange={handleChange7}
                        displayEmpty
                      >
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

      <div>
      <Grid
        sx={{
          margin: "33px",
          bgcolor: "#fff",
          height: "auto",
          padding: "1px",
          borderRadius: "10px",
          borderTop: "5px solid #7009AB;",
          boxShadow: "6px 6px 6px 6px #dedbdbae",
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={TabValue}>
            <Box>
              <TabList onChange={handleTabChange} aria-label="Tabs">
                <Tab
                  icon={<ViewInArIcon />}
                  iconPosition="start"
                  label="All Products"
                  value="1"
                  sx={{
                    color: "#7009AB",
                    "&.MuiTabs-indicator": {
                      backgroundColor: "#7009AB",
                      borderColor: "#7009AB",
                    },
                    "&.Mui-selected": {
                      color: "#7009AB",
                      borderColor: "#7009AB",
                      backgroundColor: "#efecec",
                    },
                  }}
                />
                <Tab
                  icon={<HourglassFullIcon />}
                  iconPosition="start"
                  label="Stock Report"
                  value="2"
                  sx={{
                    color: "#7009AB",
                    "&.MuiTabs-indicator": {
                      backgroundColor: "#7009AB",
                      borderColor: "#7009AB",
                    },
                    "&.Mui-selected": {
                      color: "#7009AB",
                      borderColor: "#7009AB",
                      backgroundColor: "#efecec",
                    },
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: 0, pt: 3 }}>
              <div>
                <br />
                <Button
                  className="add_btn"
                  variant="contained"
                  sx={{
                    float: "right",
                    width: 70,
                    mr: 1,
                    backgroundColor: "#7009AB",
                    mt: -5,
                  }}
                >
                  <AddIcon />
                  Add
                </Button>
                <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />

        <TableContainer sx={{ padding: 3 }}>
          <Grid
            container
            sx={{
              justifyContent: "center",
            }}
          >
            <Grid>
              <Button className="users_btngrp" variant="outlined">
                <FaFileCsv />
                &ensp;Export to CSV
              </Button>
              <Button className="users_btngrp" variant="outlined">
                <AiFillFileExcel />
                &ensp;Export to Excel
              </Button>
              <Button className="users_btngrp" variant="outlined">
                <FaPrint />
                &ensp;Print
              </Button>
              <Button className="users_btngrp" variant="outlined">
                <FaFilePdf />
                &ensp;Export to PDF
              </Button>
            </Grid>
          </Grid>
          <Table
            id="example"
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            sx={{ pr: 1 }}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.productimage);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.productimage)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.productimage}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        <Avatar
                          sx={{ backgroundColor: "#cdcdcd" }}
                          variant="square"
                        ></Avatar>
                      </TableCell>
                      <TableCell align="center">
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
                          xs={{ backgroundColor: "#000000" }}
                          className="dropdown_actions"
                        >
                          Actions
                        </Button>
                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose} disableRipple>
                            <FaBarcode /> &nbsp; &nbsp; &nbsp;Labels
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <FaEye />
                            &nbsp; &nbsp; &nbsp; View
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <FaEdit /> &nbsp;&nbsp; &nbsp; Edit
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <FaTrash /> &nbsp;&nbsp; &nbsp; Delete
                          </MenuItem>
                          <Divider sx={{ my: 2 }} />
                          <MenuItem onClick={handleClose} disableRipple>
                            <FaDatabase /> &nbsp;&nbsp; &nbsp; Add or edit opening stock
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <FaHistory /> &nbsp; &nbsp; &nbsp;Product stock history
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <FaCopy /> &nbsp; &nbsp; &nbsp;Duplicate Product
                          </MenuItem>
                        </StyledMenu>
                      </TableCell>
                      <TableCell align="center">{row.product}</TableCell>
                      <TableCell align="center">
                        {row.businesslocation}
                      </TableCell>
                      <TableCell align="center">{row.upprice}</TableCell>
                      <TableCell align="center">{row.sprice}</TableCell>
                      <TableCell align="center">{row.currentstock}</TableCell>
                      <TableCell align="center">{row.producttype}</TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">{row.brand}</TableCell>
                      <TableCell align="center">{row.tax}</TableCell>
                      <TableCell align="center">{row.sku}</TableCell>
                      <TableCell align="center">{row.cf1}</TableCell>
                      <TableCell align="center">{row.cf2}</TableCell>
                      <TableCell align="center">{row.cf3}</TableCell>
                      <TableCell align="center">{row.cf4}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <br />
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#f5365c",
              borderColor: "#f41e48",
              fontSize: 10,
              "&:hover": {
                backgroundColor: "#f50e3c",
                color: "#fff",
              },
            }}
          >
            Delete Selected
          </Button>
          &nbsp;
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#2dce89",
              borderColor: "#28b97b",
              fontSize: 10,
              "&:hover": {
                backgroundColor: "#209764",
                color: "#fff",
              },
            }}
          >
            Add to location
          </Button>
          &nbsp;
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#001f3f",
              borderColor: "#001f3f",
              fontSize: 10,
              "&:hover": {
                backgroundColor: "#14477c",
                color: "#fff",
              },
            }}
          >
            Remove from location
          </Button>
          &nbsp;
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#ffad46",
              borderColor: "#ffa22d",
              fontSize: 10,
              "&:hover": {
                backgroundColor: "#ff8e00",
                color: "#fff",
              },
            }}
          >
            Deactivate Selected
          </Button>
        </TableContainer>
      </Paper>
    </Box>
              </div>
            </TabPanel>

{/* *****Stock Report***** */}

            <TabPanel value="2" sx={{ padding: 0, pt: 3 }}>
              <div>


              <TableContainer component={Paper} sx={{ padding: 3 }}>
                  <Grid
                    container
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    <Grid>
                      <Button className="users_btngrp">
                        <FaFileCsv />&ensp;Export to CSV
                      </Button>
                      <Button className="users_btngrp">
                        <AiFillFileExcel />&ensp;Export to Excel
                      </Button>
                      <Button className="users_btngrp">
                        <FaPrint />&ensp;Print
                      </Button>
                      <Button className="users_btngrp">
                        <FaFilePdf />&ensp;Export to PDF
                      </Button>
                    </Grid>
                  </Grid>
                  <Table id="example2" sx={{}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          SKU
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Product
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Location
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px", width: 180 }}>
                          Unit Price
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Current Stock
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Current Stock Value (By purchase price)
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Current Stock Value (By sale price)
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Potential Profit
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Total Unit Sold
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Total Unit Tranferred
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                          Total Unit Adjusted
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows2.map((row) => (
                        <TableRow
                          key={row.sr_sku}
                        >
                          <TableCell component="th" scope="row">
                            {row.sr_sku}
                          </TableCell>
                          <TableCell>{row.sr_product}</TableCell>
                          <TableCell>{row.sr_location}</TableCell>
                          <TableCell>
                            {row.sr_unitprice}
                            <br />
                            <Button
                              variant="outlined"
                              onClick={handleClickModalOpen}
                              size="small"
                              sx={{ fontSize: 10, borderColor: "#7009AB", color: "#7009AB",
                              "&:hover": {
                                backgroundColor: "#7009AB",
                                color: "#fff",
                                borderColor: "#7009AB",
                              }, }}
                            >
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
                                sx={{ minWidth: 600 }}
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
                                <Button
                                  autoFocus
                                  onClick={handleModalClose}
                                  variant="outlined"
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
                          </TableCell>
                          <TableCell>{row.sr_currentstock}</TableCell>
                          <TableCell>{row.sr_currentstock_pp}</TableCell>
                          <TableCell>{row.sr_currentstock_sp}</TableCell>
                          <TableCell>{row.sr_potentialprofit}</TableCell>
                          <TableCell>{row.sr_totalunitsold}</TableCell>
                          <TableCell>{row.sr_totalunittransferred}</TableCell>
                          <TableCell>{row.sr_totalunitadjusted}</TableCell>
                        </TableRow>
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
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
      </div>
    </Box>
  );
}
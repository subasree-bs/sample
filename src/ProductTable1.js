import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,
  TableRow,TableSortLabel, Grid, ButtonGroup, Button, Container,Toolbar,
  Typography,Paper,Checkbox,IconButton,Tooltip,FormControlLabel,Switch,
  Avatar,Menu,MenuItem,Divider,} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { visuallyHidden } from "@mui/utils";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "./styles.css";
import { FaFileCsv, FaPrint, FaFilePdf, FaEdit, FaEye, FaTrash,
   FaDatabase, FaHistory, FaCopy, FaBarcode,} from "react-icons/fa";
import { AiFillFileExcel } from "react-icons/ai";

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

export default function EnhancedTable() {
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

  return (
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
                        {/* {row.action} */}
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
  );
}
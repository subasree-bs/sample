import React from "react";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import EnhancedTable from "./ProductTable1";
import CustomizedTables from "./ProductTable3";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./styles.css";

export default function ProductTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
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
              <EnhancedTable />
            </div>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0, pt: 3 }}>
            <div>
              <CustomizedTables />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
}

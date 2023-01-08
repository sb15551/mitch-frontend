import {SyntheticEvent, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {TabPanel} from "./TabPanel";
import {PlayersTab} from "../player/admin/PlayersTab";
import "./BasicTabs.css"

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export const BasicTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}} className={"basic-tabs"}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs
                    TabIndicatorProps={{style: {background: 'black'}}}
                    value={value} onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor={"inherit"}>
                    <Tab label="Турниры" {...a11yProps(0)} />
                    <Tab label="Игроки" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PlayersTab/>
            </TabPanel>
        </Box>
    );
}
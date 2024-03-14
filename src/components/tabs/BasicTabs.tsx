import {SyntheticEvent, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {TabPanel} from "./TabPanel";
import {PlayersTable} from "../player/admin/PlayersTable";
import {LocationTable} from "../location/LocationTable";
import "./BasicTabs.css"
import {TournamentTable} from "../tournament/TournamentTable";
import {LocalStorageKeyEnum} from "../../common/LocalStorageKeyEnum";
import {RowsPerPageEnum} from "../../common/RowsPerPageEnum";

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
        localStorage.setItem(LocalStorageKeyEnum.PAGE, "0");
        localStorage.setItem(LocalStorageKeyEnum.ROWS_PER_PAGE, String(RowsPerPageEnum.TEN));
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
                    <Tab label="Локации" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TournamentTable/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PlayersTable/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <LocationTable/>
            </TabPanel>
        </Box>
    );
}
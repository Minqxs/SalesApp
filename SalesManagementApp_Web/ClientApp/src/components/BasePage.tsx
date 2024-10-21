import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Grid2 } from '@mui/material';
import { TabPanel, a11yProps } from './TabPanel';
import SalesSummary from './SalesSummary';
import ProductPage from './ProductPage';

export default function PageWithTabs() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid2>
      {/* AppBar with Tabs */}
      <AppBar position="static" sx={{ background: 'gray' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="page tabs"
          sx={{ textDecorationColor: 'white' }}>
          <Tab label="Sales Summary" {...a11yProps(0)} />
          <Tab label="Product Management" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SalesSummary />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductPage />
      </TabPanel>
    </Grid2>
  );
}

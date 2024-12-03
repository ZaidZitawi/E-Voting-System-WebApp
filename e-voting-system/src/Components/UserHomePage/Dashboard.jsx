// src/pages/Dashboard.jsx

import React from "react";
import { Box, Grid, Paper, Typography, Button, Card, CardContent } from "@mui/material";
import { DashboardLayout } from "@mui/toolpad-core";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Header Section */}
      <DashboardLayout.Header>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          E-Voting Dashboard
        </Typography>
      </DashboardLayout.Header>

      {/* Sidebar Section */}
      <DashboardLayout.Sidebar>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Navigation
          </Typography>
          <Button fullWidth variant="contained" href="/dashboard" sx={{ mb: 1 }}>
            Overview
          </Button>
          <Button fullWidth variant="outlined" href="/elections" sx={{ mb: 1 }}>
            Manage Elections
          </Button>
          <Button fullWidth variant="outlined" href="/candidates" sx={{ mb: 1 }}>
            Manage Candidates
          </Button>
          <Button fullWidth variant="outlined" href="/users" sx={{ mb: 1 }}>
            Manage Users
          </Button>
        </Box>
      </DashboardLayout.Sidebar>

      {/* Main Content */}
      <DashboardLayout.Main>
        <Grid container spacing={3}>
          {/* Total Elections */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Elections
                </Typography>
                <Typography variant="h4" color="primary">
                  24
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Candidates */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Candidates
                </Typography>
                <Typography variant="h4" color="secondary">
                  120
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Votes */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Votes
                </Typography>
                <Typography variant="h4" color="success">
                  980
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Ongoing Elections */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ongoing Elections
              </Typography>
              <Box>
                <Typography variant="body1">Student Council Election</Typography>
                <Typography variant="body2" color="textSecondary">
                  Ends: 2024-12-10
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body1">Arts Club Election</Typography>
                <Typography variant="body2" color="textSecondary">
                  Ends: 2024-12-12
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DashboardLayout.Main>
    </DashboardLayout>
  );
};

export default Dashboard;

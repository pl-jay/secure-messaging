import React, { useEffect } from "react"
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import CardHeader from '@mui/material/CardHeader';
const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2
}));

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations()
  useEffect(() => {
    console.log('Component loaded')
  });
  const mainSection = (
    <div className="d-flex" style={{ minHeight: "90vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )

  const sideSection = (
    <div className="mt-3 ps-3">
      <Card className="bg-info" sx={{ maxWidth: 300, maxHeight: 300, minWidth: 100 }} >
        <CardHeader style={{ textAlign: 'center' }} subheaderTypographyProps={{
          fontSize: 15, fontWeight: 'bolder'
        }}
          subheader="Request to Connect"
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            User Details
          </Typography>
        </CardContent>
        <CardActions className="mb-2 ps-5 mt-3">
          <Button size="small" variant="contained" color="primary">Accept</Button>
          <Button size="small" variant="contained" color="error">Decline</Button>
        </CardActions>
      </Card>
    </div>
  )

  return (
    <Grid container >
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}  >
        {sideSection}
        {sideSection}
        {sideSection}
      </Grid>
      <Divider orientation="vertical" flexItem>
        VERTICAL
      </Divider>
      <Grid item xs={6} sm={6} md={8} lg={6} xl={8}>
        {mainSection}
      </Grid>
    </Grid>
  )
}
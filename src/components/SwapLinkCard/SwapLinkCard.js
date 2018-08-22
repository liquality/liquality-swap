import React from 'react'
import { Paper, Typography, Input, Grid } from '@material-ui/core'
import CopyIcon from '@material-ui/icons/FileCopy'
import './SwapLinkCard.css'

const SwapLinkCard = (props) => (
  <Paper className='SwapLinkCard'>
    <Typography variant='headline' component='h3' gutterBottom>Swap Initiated!</Typography>
    <Typography component='p' gutterBottom>Send them the link</Typography>
    <Grid container>
      <Grid item xs>
        <Input value={props.link} readOnly fullWidth autoFocus />
      </Grid>
      <Grid item>
        <CopyIcon color='primary' style={{ fontSize: 30 }} />
      </Grid>
    </Grid>
  </Paper>
)

export default SwapLinkCard

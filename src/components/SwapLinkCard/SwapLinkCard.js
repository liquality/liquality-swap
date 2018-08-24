import React, { Component } from 'react'
import { Paper, Typography, Input, Grid, Button } from '@material-ui/core'
import CopyIcon from '@material-ui/icons/FileCopy'
import './SwapLinkCard.css'

class SwapLinkCard extends Component {
  constructor (props) {
    super(props)
    this.handleCopyClick = this.handleCopyClick.bind(this)
  }

  handleCopyClick () {
    this.textArea.select()
    document.execCommand('copy')
  }

  render () {
    return <Paper className='SwapLinkCard'>
      <Typography variant='headline' component='h3' gutterBottom>Swap Initiated!</Typography>
      <Typography variant='p' gutterBottom><a href={this.props.transactionLink} target='_blank'>Link to transaction</a></Typography>
      <Typography component='p' gutterBottom>Send them the link</Typography>
      <Grid container spacing={16}>
        <Grid item xs>
          <Input value={this.props.link} inputRef={textarea => { this.textArea = textarea }} readOnly fullWidth autoFocus />
        </Grid>
        <Grid item>
          <Button variant='fab' color='primary' onClick={this.handleCopyClick}><CopyIcon /></Button>
        </Grid>
      </Grid>
    </Paper>
  }
}

export default SwapLinkCard

import React, { Component } from 'react'
import { Paper, Typography, Input, Grid, Button } from '@material-ui/core'
import CopyIcon from '@material-ui/icons/FileCopy'
import WarningIcon from '@material-ui/icons/Warning'


class BackupLinkCard extends Component {
  constructor (props) {
    super(props)
    this.handleCopyClick = this.handleCopyClick.bind(this)
  }

  handleCopyClick () {
    this.textArea.select()
    document.execCommand('copy')
  }

  render () {
    return <Paper className='BackupLinkCard'>
      <Typography variant='headline' component='h3' gutterBottom><WarningIcon color='secondary' /> Save this Swap link!</Typography>
      <Typography component='p' gutterBottom>You need this link to claim your funds if your browser closes.</Typography>
      <Grid container spacing={16}>
        <Grid item xs>
          <Input value={this.props.link} inputRef={textarea => { this.textArea = textarea }} readOnly fullWidth autoFocus />
        </Grid>
        <Grid item>
          <Button variant='fab' color='primary' onClick={this.handleCopyClick}><CopyIcon /></Button>
        </Grid>
      </Grid>
      <Button variant='contained' color='primary' onClick={this.props.onNextClick}>Next</Button>
    </Paper>
  }
}

export default BackupLinkCard

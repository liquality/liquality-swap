import React, { Component } from 'react'
import { Paper } from '@material-ui/core'


class Waiting extends Component {
  render () {
    return <Paper className='Waiting'>
      <img src='https://media.giphy.com/media/D10hKcRT6JaLu/giphy.gif' height='400px' />
    </Paper>
  }
}

export default Waiting

import React from 'react'
// import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import api from '../../../api'
import assert from '../../../assert'
import Form from '../../Form'
// import { tableRelations } from '../../helpers/schema'

// import api from '../api'
// import assert from '../assert'
// import Form from './Form'
// import { generateUISchema } from '../helpers/schema'

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden'
  }
})

class TableEditor extends React.Component {
  state = {}

  constructor (props) {
    super(props)
    this.ref = React.createRef()
  }

  render () {
    const { app, history } = this.props
    const { data = {}, schema = {}, uiSchema = {}, layout } = this.state
    const columns = [
      {
        name: 'modelName',
        label: 'Name'
      }
    ]

    return (
      <Paper style={{ padding: '10px' }}>
        <Form
          history={history}
          schema={schema}
          uiSchema={uiSchema}
          formData={data} />
      </Paper>
    )
  }
}

// TableEditor.propTypes = {
//   app: PropTypes.object.isRequired
// }

export default withStyles(styles)(TableEditor)

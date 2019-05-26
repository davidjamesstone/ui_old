import React from 'react'
// import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'

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

class Tables extends React.Component {
  state = {}

  constructor (props) {
    super(props)
    this.ref = React.createRef()
  }

  onRowClick (rowData, rowMeta) {
  }

  render () {
    const { app } = this.props
    const { data, schema, uiSchema, layout } = this.state
    const columns = [
      {
        name: 'displayName',
        label: 'Name'
      }
    ]

    const options = {
      onRowClick: (rowData, rowMeta) => {
        const { history, match } = this.props
        const name = app.tables[rowMeta.dataIndex].name
        history.push(`${match.url}/${name}`)
      }
    }

    return (
      <MUIDataTable
        title='Tables'
        data={app.tables}
        columns={columns}
        options={options}
      />
    )
  }
}

// List.propTypes = {
//   app: PropTypes.object.isRequired
// }

export default withStyles(styles)(Tables)

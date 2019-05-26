import React from 'react'
// import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Form from '../../Form'
import api from '../../../api'
import assert from '../../../assert'
import { log, logErr } from '../../../log'

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

class Table extends React.Component {
  state = {}

  constructor (props) {
    super(props)
    this.ref = React.createRef()
  }

  async componentDidMount (props) {
    try {
      const { app, match } = this.props
      const name = match.params.name
      const table = app.tables.find(table => table.name === name)

      const schemaResult = await api.get(`/api/table/${table.name}/schema`)
      assert(schemaResult.ok)
      const tableSchema = schemaResult.data

      const uiSchemaResult = await api.get(`/api/table/${table.name}/ui/schema`)
      assert(uiSchemaResult.ok)
      const tableUiSchema = uiSchemaResult.data

      this.setState({
        loaded: true,
        tableSchema,
        tableUiSchema
      })
    } catch (err) {
      logErr(err)
    }
  }

  render () {
    const { app } = this.props
    const { loaded, tableSchema, tableUiSchema } = this.state

    if (!loaded) {
      return ''
    }

    const { match } = this.props
    const name = match.params.name
    const table = app.tables.find(table => table.name === name)

    const schema = {
      'type': 'object',
      'description': 'Table',
      'required': [
        'name',
        'modelName',
        'displayName',
        'schema'
      ],
      'properties': {
        'name': {
          'type': 'string',
          'minLength': 1,
          'maxLength': 50,
          'description': 'Table name'
        },
        'modelName': {
          'type': 'string',
          'minLength': 1,
          'maxLength': 100,
          'description': 'Table model name'
        },
        'displayName': {
          'type': 'string',
          'minLength': 1,
          'maxLength': 100,
          'description': 'Table model name'
        },
        'schema': {
          'type': 'string',
          'minLength': 1,
          'maxLength': 100,
          'description': 'Table schema file'
        }
      }
    }

    const uiSchema = {
      'name': {
        'ui:title': 'Name',
        'ui:description': 'Name'
      },
      'modelName': {
        'ui:title': 'Model name',
        'ui:description': 'Model name'
      },
      'displayName': {
        'ui:title': 'Display name',
        'ui:description': 'Display name'
      },
      'schema': {
        'ui:title': 'Schema file path',
        'ui:description': 'Schema file path'
      }
    }

    const columns = [{
      name: 'name',
      label: 'Name'
    }, {
      name: 'type',
      label: 'Type'
    }, {
      name: 'displayName',
      label: 'Display name'
    }, {
      name: 'description',
      label: 'Description'
    }, {
      name: 'nullable',
      label: 'Nullable',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <FormControlLabel
            label={value ? 'Yes' : 'No'}
            value={value ? 'Yes' : 'No'}
            control={
              <Switch
                color='primary'
                checked={value}
                value={value ? 'Yes' : 'No'}
              />
            }
            onChange={event => {
              updateValue(event.target.value !== 'Yes')
            }}
          />
        }
      }
    }]
    // Object.keys(tableSchema.properties)
    //   .map(key => {
    //     const columnConfig = {
    //       name: key,
    //       options: {
    //         filter: true,
    //         sort: true
    //       }
    //     }

    //     return columnConfig
    //   })

    const fields = tableSchema.properties
    const data = Object.keys(fields)
      .map(key => {
        const field = fields[key]
        const { type, description } = field

        return {
          name: key,
          type: type,
          description: description || (tableUiSchema[key] && tableUiSchema[key]['ui:description']),
          displayName: tableUiSchema[key] && tableUiSchema[key]['ui:title'],
          nullable: type.toString().indexOf('null') > -1
        }
      })
    const options = {
      filterType: 'checkbox'
    }

    return (
      <div>
        <pre>{JSON.stringify({ table, tableSchema, tableUiSchema }, null, 2)}</pre>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={table} />

        <MUIDataTable
          title={table.displayName}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    )
  }
}

// List.propTypes = {
//   app: PropTypes.object.isRequired
// }

export default withStyles(styles)(Table)

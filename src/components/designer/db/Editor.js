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

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden'
  }
})

class Editor extends React.Component {
  state = {}

  constructor (props) {
    super(props)
    this.ref = React.createRef()
  }

  render () {
    const { app } = this.props
    // const { loaded, tableSchema, tableUiSchema } = this.state

    // if (!loaded) {
    //   return ''
    // }

    // const { match } = this.props
    // const name = match.params.name

    const schema = {
      "type": "object",
      "description": "Database JSON Schema",
      "additionalProperties": false,
      "properties": {
          "tables": {
              "type": "array",
              "items": {
                  "type": "object",
                  "properties": {
                      "name": {
                          "type": "string"
                      },
                      "displayName": {
                          "type": "string"
                      },
                      "modelName": {
                          "type": "string"
                      },
                      "description": {
                          "type": "string"
                      },
                      "fields": {
                          "type": "array",
                          "items": {
                              "type": "object",
                              "properties": {
                                  "name": {
                                      "type": "string"
                                  },
                                  "type": {
                                      "type": "string"
                                  },
                                  "displayName": {
                                      "type": "string"
                                  },
                                  "description": {
                                      "type": "string"
                                  }
                              },
                              "required": [
                                  "name",
                                  "type",
                                  "displayName",
                                  "description"
                              ]
                          }
                      }
                  },
                  "required": [
                      "name",
                      "displayName",
                      "modelName",
                      "description",
                      "fields"
                  ]
              }
          }
      },
      "required": [
          "tables"
      ]
  }

    return (
      <div>
        <pre>{JSON.stringify(app, null, 2)}</pre>
        <Form
          schema={schema}
          // uiSchema={uiSchema}
          formData={{}} />

        {/* <MUIDataTable
          title={table.displayName}
          data={data}
          columns={columns}
          options={options}
        /> */}
      </div>
    )
  }
}

// List.propTypes = {
//   app: PropTypes.object.isRequired
// }

export default withStyles(styles)(Editor)

// {
//   "title": "Custom validation",
//   "description": "This form defines custom validation rules checking that the two passwords match.",
//   "type": "object",
//   "properties": {
//     "pass1": {
//       "title": "Password",
//       "type": "string",
//       "minLength": 3
//     },
//     "pass2": {
//       "title": "Repeat password",
//       "type": "string",
//       "minLength": 3
//     },
//     "age": {
//       "title": "Age",
//       "type": "number",
//       "minimum": 18
//     }
//   }
// }







// const schema = {
//   'type': 'object',
//   'description': 'Table',
//   'required': [
//     'name',
//     'modelName',
//     'displayName',
//     'schema'
//   ],
//   'properties': {
//     'name': {
//       'type': 'string',
//       'minLength': 1,
//       'maxLength': 50,
//       'description': 'Table name'
//     },
//     'modelName': {
//       'type': 'string',
//       'minLength': 1,
//       'maxLength': 100,
//       'description': 'Table model name'
//     },
//     'displayName': {
//       'type': 'string',
//       'minLength': 1,
//       'maxLength': 100,
//       'description': 'Table model name'
//     },
//     'schema': {
//       'type': 'string',
//       'minLength': 1,
//       'maxLength': 100,
//       'description': 'Table schema file'
//     }
//   }
// }

// const uiSchema = {
//   'name': {
//     'ui:title': 'Name',
//     'ui:description': 'Name'
//   },
//   'modelName': {
//     'ui:title': 'Model name',
//     'ui:description': 'Model name'
//   },
//   'displayName': {
//     'ui:title': 'Display name',
//     'ui:description': 'Display name'
//   },
//   'schema': {
//     'ui:title': 'Schema file path',
//     'ui:description': 'Schema file path'
//   }
// }










// const columns = [{
//   name: 'name',
//   label: 'Name'
// }, {
//   name: 'type',
//   label: 'Type'
// }, {
//   name: 'displayName',
//   label: 'Display name'
// }, {
//   name: 'description',
//   label: 'Description'
// }, {
//   name: 'nullable',
//   label: 'Nullable',
//   options: {
//     customBodyRender: (value, tableMeta, updateValue) => {
//       return <FormControlLabel
//         label={value ? 'Yes' : 'No'}
//         value={value ? 'Yes' : 'No'}
//         control={
//           <Switch
//             color='primary'
//             checked={value}
//             value={value ? 'Yes' : 'No'}
//           />
//         }
//         onChange={event => {
//           updateValue(event.target.value !== 'Yes')
//         }}
//       />
//     }
//   }
// }]

// const fields = tableSchema.properties
// const data = Object.keys(fields)
//   .map(key => {
//     const field = fields[key]
//     const { type, description } = field

//     return {
//       name: key,
//       type: type,
//       description: description || (tableUiSchema[key] && tableUiSchema[key]['ui:description']),
//       displayName: tableUiSchema[key] && tableUiSchema[key]['ui:title'],
//       nullable: type.toString().indexOf('null') > -1
//     }
//   })
// const options = {
//   filterType: 'checkbox'
// }
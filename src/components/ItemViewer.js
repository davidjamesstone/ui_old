import React from 'react'
// import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import api from '../api'
import assert from '../assert'
import Form from './Form'
import SchemaForm from 'react-jsonschema-form' // 980kb (moz)
// import brace from 'brace'
// import AceEditor from 'react-ace'
// import 'brace/theme/github'
// import 'brace/mode/javascript'

function FieldTemplate (props) {
  const { id, classNames, label, help, required, description, rawDescription, errors, children } = props
  return (
    <div className={classNames}>
      {/* <label htmlFor={id}>{label}{required ? '*' : null}</label> */}
      {/* {rawDescription && (
        <Tooltip title={description}>
          <IconButton aria-label={description} style={{ float: 'right' }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )} */}
      {children}
      {errors}
      {help}
    </div>
  )
}

function onChange (newValue) {
  console.log('change', newValue)
}


class ItemViewer extends React.Component {
  state = {}

  async setTable (props) {
    const { app } = props
    const { id, name } = props.match.params
    const table = app.tables.find(tbl => tbl.name === name)

    this.setState({
      table,
      schema: null
    })

    try {
      const itemResult = await api.get(`/api/table/${table.name}/${id}`)
      assert(itemResult.ok)
      const data = itemResult.data

      const schemaResult = await api.get(`/api/table/${table.name}/schema`)
      assert(schemaResult.ok)
      const schema = schemaResult.data

      const uiSchemaResult = await api.get(`/api/table/${table.name}/ui/schema`)
      assert(uiSchemaResult.ok)
      const uiSchema = uiSchemaResult.data

      this.setState({
        data,
        schema,
        uiSchema
      })
    } catch (err) {
      console.error(err)
    }
  }

  componentDidMount () {
    this.setTable(this.props)
    // this.changePage()
  }

  render () {
    const { history, match } = this.props
    const { data, schema, uiSchema } = this.state

    if (!schema || !data) {
      return ''
    }

    return (
//       <SchemaForm
//       // classes={classes}
//         schema={schema}
//         // liveValidate
//         uiSchema={uiSchema}
//         formData={data}
//         // fields={fields}
//         // widgets={widgets}
//         FieldTemplate={FieldTemplate}
//         // onCancel={this.onCancel}
//         // onSubmit={this.onSubmit}
//         onChange={this.onFormChange}>
// {/* 
//         <Button onClick={this.onDialogClose} color='primary'>Reset</Button>
//         <Button onClick={this.onDialogClose} color='primary'>Save</Button> */}
//       </SchemaForm>
      <Paper style={{ padding: '10px' }}>
        <code><pre>{JSON.stringify(data, null, 2)}</pre></code>
        <Link to={`${match.url}/edit`}>Edit</Link>
        <div id='UNIQUE_ID_OF_DIV' />
        {/* <AceEditor
          mode='javascript'
          theme='github'
          onChange={onChange}
          name='UNIQUE_ID_OF_DIV'
          editorProps={{ $blockScrolling: true }}
        /> */}
      </Paper>
    )
  }
}

// Table.propTypes = {
//   classes: PropTypes.object.isRequired
// }

export default ItemViewer

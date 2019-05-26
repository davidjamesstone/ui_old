import React from 'react'
// import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import api from '../api'
import assert from '../assert'
import Form from './Form'

class ItemEditor extends React.Component {
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

  onSubmit = (e) => {
    console.log('Sibmit')
    const { id, name } = this.props.match.params
    api.put(`/api/table/${name}/${id}`, e.formData)
  }

  onError = (e) => {
    console.log('Sibmit', e)
  }

  render () {
    const { history } = this.props
    const { data, schema, uiSchema } = this.state

    if (!schema || !data) {
      return ''
    }

    return (
      <Paper style={{ padding: '10px' }}>
        <Form
          history={history}
          schema={schema}
          uiSchema={uiSchema}
          formData={data}
          onSubmit={this.onSubmit}
          onError={this.onError} />
      </Paper>
    )
  }
}

// Table.propTypes = {
//   classes: PropTypes.object.isRequired
// }

export default ItemEditor

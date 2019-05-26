import React from 'react'
// import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import api from '../api'
import assert from '../assert'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
// import { columnRelations } from '../helpers/schema'
import relationsHelper from '@stoneware/common/helpers/relations'

class Table extends React.Component {
  state = {
    page: 0,
    count: 100,
    data: []
  }

  async setTable (props) {
    const { app } = props
    const name = props.match.params.name
    const table = app.tables.find(tbl => tbl.name === name)

    this.setState({
      table,
      schema: null
    }, () => this.changePage())

    try {
      const schemaResult = await api.get(`/api/table/${table.name}/schema`)
      assert(schemaResult.ok)
      const uiSchemaResult = await api.get(`/api/table/${table.name}/ui/schema`)
      assert(uiSchemaResult.ok)

      this.setState({
        schema: schemaResult.data,
        uiSchema: uiSchemaResult.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  componentDidMount () {
    this.setTable(this.props)
    // this.changePage()
  }

  componentWillReceiveProps (props) {
    this.setTable(props)
    // this.changePage()
  }

  async changePage (page) {
    const { table } = this.state

    try {
      const result = await api.get(`/api/table/${table.name}`)
      result.data.forEach(item => { delete item.address })
      this.setState({
        page: page,
        data: result.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const { app, history } = this.props
    const { data, schema, uiSchema, table, page, count } = this.state

    if (!schema || !data) {
      return ''
    }

    const columns = Object.keys(schema.properties)
      // .filter(key => key !== 'id')
      .filter(key => schema.properties[key].type !== 'object')
      .map(key => {
        const relations = relationsHelper.getColumnDependencies(app, table, key)

        const columnConfig = {
          name: key,
          options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => {
            //   if (schema.properties[key].type === 'object') {
            //     return JSON.stringify(value)
            //   }

            //   if (schema.properties[key].type === 'boolean') {
            //     value = <FormControlLabel
            //       label={value ? 'Yes' : 'No'}
            //       value={value ? 'Yes' : 'No'}
            //       control={
            //         <Switch
            //           color='primary'
            //           checked={value}
            //           value={value ? 'Yes' : 'No'}
            //         />
            //       }
            //       onChange={event => {
            //         updateValue(event.target.value !== 'Yes')
            //       }}
            //     />
            //   }

            //   return relations.length
            //     ? <Link to={`/table/${relations[0].join.to.table}/${value}`}>{value}</Link>
            //     : value
            // }
          }
        }

        if (uiSchema && uiSchema[key]) {
          Object.assign(columnConfig, {
            label: uiSchema[key]['ui:title']
          })
        }

        return columnConfig
      })

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      serverSide: true,
      count: count,
      page: page,
      onRowClick: (rowData, rowMeta) => {
        // : string[],: { dataIndex: number, rowIndex: number }
        const id = data[rowData[0] - 1].id
        history.push(`/table/${table.name}/${id}`)
      },
      onTableChange: (action, tableState) => {
        console.log(action, tableState)
        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want

        switch (action) {
          case 'changePage':
            this.changePage(tableState.page)
            break
          default:
            console.log('Eeek')
        }
      }
    }

    return (
      <div>
        <MUIDataTable
          title={table.displayName}
          data={data}
          columns={columns}
          options={options}
        />
        <Link to={`/table/${table.name}/create`}>Create</Link>
      </div>
    )
  }
}

// Table.propTypes = {
//   classes: PropTypes.object.isRequired
// }

export default Table

import React from 'react'
// import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import DirectionsIcon from '@material-ui/icons/Directions'
import InputBase from '@material-ui/core/InputBase'
import api from '../../api'

class TestLab extends React.Component {
  state = {}

  // async setTable (props) {
  //   const { app } = props
  //   const { id, name } = props.match.params
  //   const table = app.tables.find(tbl => tbl.name === name)

  //   this.setState({
  //     table,
  //     schema: null
  //   })

  //   try {
  //     const itemResult = await api.get(`/api/table/${table.name}/${id}`)
  //     assert(itemResult.ok)
  //     const data = itemResult.data

  //     const schemaResult = await api.get(`/api/table/${table.name}/schema`)
  //     assert(schemaResult.ok)
  //     const schema = schemaResult.data

  //     const uiSchemaResult = await api.get(`/api/table/${table.name}/ui/schema`)

  //     this.setState({
  //       data,
  //       schema,
  //       uiSchema: uiSchemaResult.ok ? uiSchemaResult.data : generateUISchema(schema)
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  componentDidMount () {
    // this.setTable(this.props)
    // // this.changePage()
  }

  onChangeUrl = (e) => {
    const value = e.target.value.trim()
    // this.setState({ query: value })
    api.get(value).then(result => this.setState({ result: result.data }))
  }

  componentWillReceiveProps (props) {
    const path = props.match.params.path
  }

  render () {
    // const { history } = this.props
    const { result } = this.state
    // const { src = `${baseUrl}/api/table/movie?eager=reviews` } = this.state

    return (
      <div>
        <Paper style={{ padding: '10px' }} elevation={1}>
          <IconButton aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <InputBase placeholder='Search Google Maps' onBlur={this.onChangeUrl} />
          <IconButton aria-label='Search'>
            <SearchIcon />
          </IconButton>
          <Divider />
          <IconButton color='primary' aria-label='Directions'>
            <DirectionsIcon />
          </IconButton>
        </Paper>
        {result && (
          <Paper style={{ padding: '10px' }}>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Paper>
        )}
      </div>
    )
  }
}

// Table.propTypes = {
//   classes: PropTypes.object.isRequired
// }

export default TestLab

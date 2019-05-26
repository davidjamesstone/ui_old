import React from 'react'
// import SchemaForm from 'react-jsonschema-materialui-forms' // 1.2MB
// import SchemaForm from 'jsonschema-form-for-material-ui' // <-748kb (original but not working in a dialog)
// import SchemaForm from 'react-jsonschema-form-material-ui' // <--2.4MB
import SchemaForm from 'react-jsonschema-form' // 980kb (moz)
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import HelpIcon from '@material-ui/icons/Help'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import widgets from './form/widgets'

function FieldTemplate (props) {
  const { id, classNames, label, help, required, description, rawDescription, errors, children } = props
  return (
    <div className={classNames}>
      {/* <label htmlFor={id}>{label}{required ? '*' : null}</label> */}
      {rawDescription && (
        <Tooltip title={description}>
          <IconButton aria-label={description} style={{ float: 'right' }}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      )}
      {children}
      {/* {errors} */}
      {help}
    </div>
  )
}

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      hasErrors: false,
      formData: props.formData
    }
  }

  onChange = ({ formData, errors }) => {
    const hasErrors = !!errors.length
    this.setState({ formData, hasErrors })
  }

  componentWillReceiveProps () {
    this.setState({ open: true })
  }

  // validate = (formData, errors) => {
  //   // const { hasErrors } = this.state

  //   // if (hasErrors !== !!errors.__errors.length) {
  //   //   this.setState({ hasErrors: !!errors.__errors.length })
  //   // }

  //   this.errors = errors
  //   return errors
  // }

  render () {
    const { formData } = this.state
    const { schema, uiSchema, onSubmit, onCancel, onError } = this.props

    return (
      <div>
        <SchemaForm
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          widgets={widgets}
          FieldTemplate={FieldTemplate}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onChange={this.onChange}
          onError={onError}>
          <Button onClick={this.onDialogClose} color='primary' type='reset'>Reset</Button>
          <Button onClick={this.onDialogClose} color='primary' type='submit'>Save</Button>
        </SchemaForm>
        <code><pre>{JSON.stringify(formData, null, 2)}</pre></code>
      </div>
    )
  }
}

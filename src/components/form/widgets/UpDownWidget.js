import React from 'react'
import PropTypes from 'prop-types'

import { rangeSpec } from 'react-jsonschema-form/lib/utils'

function UpDownWidget (props) {
  const {
    registry: {
      widgets: { BaseInput }
    }
  } = props

  const inputProps = rangeSpec(props.schema)
  
  return <BaseInput type='number' inputProps={inputProps} {...props} />
}

if (process.env.NODE_ENV !== 'production') {
  UpDownWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }
}

export default UpDownWidget

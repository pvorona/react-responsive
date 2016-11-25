import React, { Component, PropTypes } from 'react'
const { node, func, string, oneOfType } = PropTypes

export class Media extends Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.mediaQueryList = matchMedia(this.props.query)
    this.mediaQueryList.addListener(this.update)
  }

  componentWillUnmount () {
    this.mediaQueryList.removeListener(this.update)
  }

  update () {
    this.setState({ matches: this.mediaQueryList.matches })
  }

  render () {
    const { children } = this.props
    const { matches } = this.state

    if (typeof children === 'function') {
      return children(matches) || null
    }

    return matches ? children : null
  }
}

Media.propTypes = {
  children: oneOfType([node, func]).isRequired,
  query: string.isRequired
}
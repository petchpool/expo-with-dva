import React from 'react'
import { create } from 'dva-core'
import { Provider, connect } from 'react-redux'

export { connect }

export default options => {
  const app = create(options)

  app.start()
  const store = app._store

  app.start = container => () => <Provider store={ store }>{ container }</Provider>
  app.getStore = () => store

  return app
}
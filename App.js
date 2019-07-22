import React from 'react'
import createLoading from 'dva-loading'
import dva from './utils/dva'
import { registerModels } from './models'
import Router, { routerMiddleware, routerReducer } from './router'

const app = dva({
  initialState: {},
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  }
})

app.use(createLoading())

registerModels(app)

export default app.start(<Router />)


import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { PureComponent } from 'react'
import { Platform, StatusBar, View, BackHandler } from 'react-native'
import AppNavigator from './navigation/AppNavigator'
import { NavigationActions } from 'react-navigation'

import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { Assets } from './constants'
import { objToArray } from './utils/helpers'

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  state => state.router
)

const App = createReduxContainer(AppNavigator)

const getActiveRouteName = navigationState => {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

class Router extends PureComponent {

  state = {
    isLoadingComplete: false
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._backHandle)
  }

  _backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  _loadResourcesAsync = async () => {
    const assets = [...objToArray(Assets.imageAssets)]
    await Promise.all([
      Asset.loadAsync(assets),
      Font.loadAsync(Assets.fontAssets),
    ])
  }

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  render() {
    const { isLoadingComplete } = this.state
    const { dispatch, router } = this.props
    if (!isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={ this._loadResourcesAsync }
          onError={ this._handleLoadingError }
          onFinish={ this._handleFinishLoading }
        />
      )
    } else {
      return (
        <View style={ { flex: 1, backgroundColor: '#ffffff' } }>
          { Platform.OS === 'ios' && <StatusBar barStyle="default" /> }
          <App dispatch={ dispatch } state={ router } />
        </View>
      )
    }
  }
}

export default connect(({ router }) => ({ router }))(Router)
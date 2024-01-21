import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'
import base from './base'
import locale from './locale/localeSlice'
import icon from './icon/iconSlice'
import netoResult from './netoResult/netoResultSlice'
import cajaYBcoCierre from './cajaYBcoCierre/cajaYBcoCierreSlice'

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    theme,
    auth,
    base,
    locale,
    icon,
    netoResult,
    cajaYBcoCierre,
    ...asyncReducers,
  })
  return combinedReducer(state, action)
}

export default rootReducer

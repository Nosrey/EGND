import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'
import base from './base'
import locale from './locale/localeSlice'
import icon from './icon/iconSlice'

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    theme,
    auth,
    base,
    locale,
    icon,
    ...asyncReducers,
  })
  return combinedReducer(state, action)
}

export default rootReducer

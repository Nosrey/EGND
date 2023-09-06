import React from 'react'
// import Cover from './Cover'
// import Simple from './Simple'
import View from 'views'
import { useSelector } from 'react-redux'
import { LAYOUT_TYPE_BLANK } from 'constants/theme.constant'
import Side from './Side'

function AuthLayout(props) {
  const layoutType = useSelector((state) => state.theme.layout.type)

  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
      {layoutType === LAYOUT_TYPE_BLANK ? (
        <View {...props} />
      ) : (
        <Side>
          <View {...props} />
        </Side>
      )}
    </div>
  )
}

export default AuthLayout

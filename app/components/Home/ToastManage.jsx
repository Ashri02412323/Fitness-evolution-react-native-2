import React from 'react'
import ToastManager from 'toastify-react-native'

const ToastManage = () => {
  return (
    <ToastManager width={'100%'} height={'auto'} duration={3000} style={{paddingTop:5, paddingBottom:5}} textStyle={{width:"85%",lineHeight:24,marginLeft:3}}>
    </ToastManager>
  )
}

export default ToastManage
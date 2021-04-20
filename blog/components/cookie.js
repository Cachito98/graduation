import cookie from 'react-cookies'
// import cookies from 'js-cookie'

// 获取当前用户cookie
export const loginUser = () => {
  return cookie.load('userInfo')
}

// 用户登录，保存cookie
export const onLogin = (user) => {
  cookie.save('userInfo', user, { path: '/' })
}

// 用户登出，删除cookie
export const logout = () => {
  cookie.remove('userInfo')
  window.location.href = '/Login'
}

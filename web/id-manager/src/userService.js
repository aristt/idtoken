var userService = {

  getUser: function() {
    var user = {
      name: window.localStorage.getItem('user_name'),
      email: window.localStorage.getItem('email')
    }
    user.displayName = user.name || user.email
    return user
  },

  isAuthenticated: function() {
    console.log('auth service isAuthenticated')
    return window.localStorage.getItem('authenticated')
  },

  login: function(user) {
    console.log('auth service login')
    window.localStorage.setItem('authenticated', true)
    if (user.name) window.localStorage.setItem('user_name', user.name)
    if (user.email) window.localStorage.setItem('email', user.email)
    return
  },

  logout: function() {
    console.log('auth service logout')
    window.localStorage.removeItem('authenticated')
    window.localStorage.removeItem('user_name')
    window.localStorage.removeItem('email')
    return
  }
}

export default userService

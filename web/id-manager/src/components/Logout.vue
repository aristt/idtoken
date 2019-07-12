<template>
<div></div>
</template>

<script>
import userService from "../userService"
export default {
  created: function() {
    var router = this.$router
    userService.logout()
    this.$emit('logout')
    router.push('/')
  }
}
</script>

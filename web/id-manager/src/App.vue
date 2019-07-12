<template>
<div id="app">
  <div id="nav">

    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand to="/">Identity Manager</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse" />
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
          </b-navbar-nav>

          <!-- Right aligned nav items -->

          <b-navbar-nav class="ml-auto" v-if="!isAuthenticated">
            <b-nav-item to="/login">Sign in</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-if="isAuthenticated">
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">{{user.displayName}}</template>
              <b-dropdown-item to="/logout">Sign out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-container>
    </b-navbar>

  </div>
  <router-view  @login="updateMenu" @logout="updateMenu" />
</div>
</template>

<script>
import
userService
from "./userService"
export default {
  data() {
    return {
      isAuthenticated: null,
      user: null
    }
  },
  methods: {
    updateMenu: function() {
      console.log('updateMenu')
      if (userService.isAuthenticated()) {
        this.isAuthenticated = true
        this.user = userService.getUser()
      } else {
        this.isAuthenticated = false
      }
    }
  },
  created: function() {
    this.updateMenu()
  }
}
</script>

<style>

</style>

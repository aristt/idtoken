<template>
<div>


  <b-container>
    <br>

    <b-row>
      <b-col class="col-md-6 offset-md-3">
        <h2>Login</h2>

        <b-form>
          <b-form-group id="emailGroup" label="Email address:" label-for="emailInput">
            <b-form-input id="emailInput" type="email" v-model="email" required placeholder="" />
            <b-form-invalid-feedback :state="!this.msg.email">
              {{msg.email}}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="PasswordGroup" label="Password:" label-for="passwordInput">
            <b-form-input id="passwordInput" type="password" v-model="password" required placeholder="" />
            <b-form-invalid-feedback :state="!this.msg.password">
              {{msg.password}}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-button v-on:click="handleSubmit">Login</b-button>
        </b-form>


      </b-col>
    </b-row>
  </b-container>

</div>
</template>


<script>
import userService from "../userService"
import {
  parseMsg
} from "../util"
export default {
  data() {
    return {
      email: "",
      password: "",
      msg: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const email = 'admin@idmanager.com'
      const password = 'admin'
      if (this.email == email && this.password == password) {
        userService.login({
          'name': 'Admin',
          'email': 'admin@idmanager.com'
        })
        this.$emit('login')
        this.$router.push('/')
      } else {
        parseMsg({
          errors: [{
            'param': 'password',
            'msg': 'Invalid credentials'
          }]
        }, this.msg)
      }
    }
  }
}
</script>

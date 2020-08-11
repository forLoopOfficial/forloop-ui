<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="signInWithPassword()">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <div class="input-group mb-3">
                    <span class="input-group-addon"
                      ><i class="icon-user"></i
                    ></span>
                    <b-form-input
                      id="input1"
                      type="email"
                      v-model="email"
                      required
                      placeholder="Enter email"
                    ></b-form-input>
                  </div>
                  <div class="input-group mb-4">
                    <span class="input-group-addon"
                      ><i class="icon-lock"></i
                    ></span>
                    <b-form-input
                      id="input2"
                      type="password"
                      v-model="password"
                      required
                      placeholder="Enter password"
                    ></b-form-input>
                  </div>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0"
                        >Forgot password?</b-button
                      >
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card
              no-body
              class="text-white bg-primary py-5 d-md-down-none"
              style="width:44%"
            >
              <b-card-body class="text-center">
                <div>
                  <h2>Forloop Africa</h2>
                  <p><strong>Welcome!</strong> Log in to access admin portal</p>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  middleware: 'anonymous',
  layout: 'admin-login',
  // lifecycle methods
  mounted() {
    firebase
      .app('AdminApp')
      .auth()
      .signOut()
  },

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    ...mapActions(['login', 'adminLogin']),
    signInWithPassword() {
      return firebase
        .app('AdminApp')
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          return user.getIdToken()
        })
        .then(token => {
          console.log('token', token)
          return this.adminLogin({ token })
        })
        .then(() => {
          this.$toast.success('Auth successful')
          this.$router.push('/admin/dashboard')
        })
        .catch(error => {
          console.log(error)
          this.$toast.error(error.message) // tell the user an error occurred
        })
    },
    onSignedIn() {
      console.log('going home')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
@import '~assets/admin/scss/style.scss';
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

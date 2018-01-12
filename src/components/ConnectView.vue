<template>
  <div class="mdl-grid">
    <form action="#">
      <div class="mdl-textfield mdl-js-textfield">
        <input class="mdl-textfield__input" type="text" id="login" v-model="login">
      </div>
      <div class="mdl-textfield mdl-js-textfield">
        <input class="mdl-textfield__input" type="text" id="pass" v-model="pass">
      </div>
      <a @click.prevent="connect(login, pass)" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
        Login
      </a>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      'login': '',
      'pass': '',
      'id': ''
    }
  },
  methods: {
    connect (login, pass) {
      this.$http.get('http://chifucookie.cleverapps.io/public/user/dev/pass').then(response => {
        this.id = response.body.id
        this.$cookie.set('userid', this.id)
      }).then(this.$router.push('/game'))
    }
  }
}
</script>
<style scoped>
</style>
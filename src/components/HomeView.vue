<template>
  <div class="mdl-grid" v-if="this.$cookie.get('userid')">
    <div class="mdl-cell mdl-cell--8-col">
      <div class="info">
        <span class="displaycookies">Cookies : {{ Math.round(this.cookies) }}</span>
        <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/login" @click.native="disconnect">Logout</router-link>
      </div>
      <div class="actions">
        <span>Bait {{Math.round(this.cookies * (0 + (baitValue / 100))) }} cookies ({{ baitValue }}%)</span>
        <p style="width:300px">
          <input class="mdl-slider mdl-js-slider" type="range" id="baitRange" min="5" max="100" v-bind:value="baitValue" step="1" v-on:input="onChange($event)">
        </p>
        <img src="../../static/img/rock.png" alt="Rock" height="128" width="128" v-on:click="bait(0, baitValue)"> 
        <img src="../../static/img/leaf.png" alt="Leaf" height="128" width="128" v-on:click="bait(1, baitValue)"> 
        <img src="../../static/img/scissor.png" alt="Scissor" height="128" width="128" v-on:click="bait(2,baitValue)"> 
      </div>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
      <div class="ranktitle">The best CookieBaiters</div>
      <ul class="demo-list-two mdl-list" v-for="best in rank">
        <li class="mdl-list__item mdl-list__item--two-line">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-avatar">person</i>
            <span>{{ best.pseudo }}</span>
            <span class="mdl-list__item-sub-title">Cookies : {{ best.cookies }} </span>
          </span>
        </li>
      </ul>
    </div>
    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Lowest</h2>
      </div>
      <div class="mdl-card__supporting-text">
        100 Cookies 
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="buy(100)">
          10€
        </a>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <span class="informationbuy">Wow! Get 100 cookies for 10€! Very interesting if you are poor! "Somebody touch my spaghetti!"</span>
      </div>
    </div>
    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Prefered</h2>
      </div>
      <div class="mdl-card__supporting-text">
        1100 Cookies
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="buy(1100)">
          100€
        </a>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <span class="informationbuy">Such wow! Get 1100 cookies for 100€! the most bought because people are pigeons but not too much. "Do u kno da wey?"</span>
      </div>
    </div>
    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Most valuable</h2>
      </div>
      <div class="mdl-card__supporting-text">
        13000 Cookies
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="buy(13000)">
          1000€
        </a>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <span class="informationbuy">Get 13000 cookies for 1000€! More rentable than a bitcoin! "There is da wey"</span>
        <audio controls>
          <source src="../assets/russian.mp3" type="audio/mpeg">
        </audio>
      </div>
    </div>
  </div>
  <div v-else>
    <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/login">Connect</router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      'userid': this.$cookie.get('userid'),
      'cookies': 0,
      'rank': [],
      'counter': 1,
      baitValue: 5
    }
  },
  methods: {
    onChange (e) {
      this.baitValue = e.target.value
    },
    bait (playerMove, baitValue) {
      this.pcPlay = Math.floor(Math.random() * Math.floor(3))
      if (playerMove === this.pcPlay) {
        alert('Draw, nothing change')
      } else {
        if (playerMove === 0) {
          if (this.pcPlay === 2) {
            this.win(this.cookies, baitValue)
          } else {
            this.lose(this.cookies, baitValue)
          }
        }
        if (playerMove === 1) {
          if (this.pcPlay === 0) {
            this.win(this.cookies, baitValue)
          } else {
            this.lose(this.cookies, baitValue)
          }
        }
        if (playerMove === 2) {
          if (this.pcPlay === 1) {
            this.win(this.cookies, baitValue)
          } else {
            this.lose(this.cookies, baitValue)
          }
        }
      }
    },
    win (nbCookie, baitValue) {
      alert('You win !')
      this.cookies = nbCookie * (1 + (baitValue / 100))
      this.$http.put('http://chifucookie.cleverapps.io/public/cookies/' + this.userid + '/' + this.cookies + '')
    },
    lose (nbCookie, baitValue) {
      alert('You lose !')
      this.cookies = nbCookie * (1 - (baitValue / 100))
      this.$http.put('http://chifucookie.cleverapps.io/public/cookies/' + this.userid + '/' + this.cookies + '')
    },
    buy (nbCookie) {
      this.cookies += nbCookie
      this.$http.put('http://chifucookie.cleverapps.io/public/cookies/' + this.userid + '/' + this.cookies + '')
    },
    disconnect () {
      this.$cookie.delete('userid')
    }
  },
  mounted () {
    this.$http.get('http://chifucookie.cleverapps.io/public/cookies/' + this.userid).then(response => {
      this.cookies = parseInt(response.body.cookies)
    })
    this.$http.get('http://chifucookie.cleverapps.io/public/rank').then(response => {
      this.rank = response.body
    })
  }
}
</script>
<style scoped>
.mdl-cell {
  border: 1px solid black;
}
.demo-card-wide.mdl-card {
  position: relative;
  width: 33%;
}
.demo-card-wide > .mdl-card__title {
  color: #fff;
  height: 60px;
  background: rgb(63,81,181);
}
.displaycookies {
  font-size: 2em;
}
.ranktitle {
  font-size: 1.8em;
}
</style>
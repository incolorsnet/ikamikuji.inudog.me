<template lang="pug">
  div
    section.p_geroshabu
      .c_inner
        ul.p_geroshabu-list.c_col.u_col-wrap
          li.p_geroshabu-item(v-for="(ika, i) in ikas", :key="i")
            .p_gero
              .p_gero-result.c_col-c
                p {{ika.result}}
              form(autocomplete="off")
                .p_gero-form
                  .p_gero-form-name
                    input(type="text", name="イカ名", id="ikaName", v-model="ika.name")
                  ul.p_gero-form-position.c_col.u_col-wrap
                    li.p_gero-form-radio
                      input(type="radio", :id="`a${i}`", name="radio" value="a", v-model="ika.position")
                      label(for="a") 最前衛
                    li.p_gero-form-radio
                      input(type="radio", :id="`b${i}`", name="radio" value="b", v-model="ika.position")
                      label(for="b") 前衛
                    li.p_gero-form-radio
                      input(type="radio", :id="`c${i}`", name="radio" value="c", v-model="ika.position")
                      label(for="c") 中衛
                    li.p_gero-form-radio
                      input(type="radio", :id="`d${i}`", name="radio" value="d", v-model="ika.position")
                      label(for="d") 後衛
                    li.p_gero-form-radio
                      input(type="radio", :id="`e${i}`", name="radio" value="e", v-model="ika.position")
                      label(for="e") 珍
        .p_gero-form-submit
          button(type="button", @click="click") おみくじスタート
</template>

<script>
// import firebase from '~/plugins/firebase.js'
import json from '~/static/json/weapons.json'
export default {
  name: 'HelloWorld',
  data() {
    return {
      ikas: [],
      position: [],
      geroshabu: {
        json: json
      },
      buttonBorder: false
    }
  },
  created() {
    const ikas = () => {
      return this.initializingUserArray()
    }
    this.ikas = ikas()
  },
  methods: {
    initializingUserArray() {
      const arr = []

      for (let i = 0; i < 8; i++) {
        arr.push({
          name: `${i + 1}号`,
          position: '',
          weapons: [],
          result: ''
        })
      }
      return arr
    },
    createWeaponsArray(ikas, json) {
      for (let i = 0; i < ikas.length; i++) {
        const position = ikas[i].position
        ikas[i].weapons = json[position]
      }
    },
    omikujiResult(ikas) {
      for (let i = 0; i < ikas.length; i++) {
        const weapon = ikas[i].weapons
        const randomWeapon = weapon[Math.floor(Math.random() * weapon.length)]
        ikas[i].result = randomWeapon.item
      }
    },
    click() {
      const ikas = this.ikas
      const json = this.geroshabu.json[0]
      for (let i = 0; i < ikas.length; i++) {
        if (!ikas[i].position) {
          this.buttonBorder = false
          return false
        }
      }
      this.buttonBorder = true
      this.createWeaponsArray(ikas, json)
      this.$nextTick(this.omikujiResult(ikas))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.p_geroshabu {
  padding: 100px 0;

  &-list {
  }

  &-item {
    width: cal(235, 1000);
    margin: 0 0 0 cal(20, 1000);
    padding: 0 0 20px;

    &:nth-of-type(4n + 1) {
      margin: 0;
    }
  }
}
.p_gero {
  &-result {
    color: #ed568b;
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
  }

  &-form {
    &-name {
      input {
        border: 1px solid #cbcbcb;
        padding: 8px 10px;
        font-size: 16px;
        width: 100%;
      }
    }

    &-position {
      width: 100%;
      margin: 10px 0 0;
    }

    &-radio {
      width: 49%;
      height: 40px;
      margin: 0 0 5px 2%;
      position: relative;

      &:nth-child(2n + 1) {
        margin: 0 0 5px;
      }

      input {
        width: 100%;
        height: 40px;
        border: 4px solid #ccc;
        position: relative;
        z-index: 2;

        &:checked {
          border-color: #ed568b;
        }

        &:checked + label {
          color: #fff;
          background: #ed568b;
        }
      }
      label {
        width: 100%;
        height: 100%;
        display: block;
        padding: 10px 0;
        position: absolute;
        text-align: center;
        z-index: 1;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        font-weight: bold;
        font-size: 16px;
        letter-spacing: 0.15em;
      }
    }

    &-submit {
      button {
        border: 4px solid #ed568b;
        width: 320px;
        display: block;
        margin: 0 auto;
        padding: 18px 20px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;

        &.border {
          border-color: #ed568b;
        }
      }
    }
  }
}
</style>

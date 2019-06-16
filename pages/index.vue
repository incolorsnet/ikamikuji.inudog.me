<template lang="pug">
  section.p_splatoon
    .c_inner
      .p_splatoon-inner
        .p_splatoon-header
          h1.p_splatoon-heading
            span.-bootcamp: img(src="~/assets/img/heading.png", alt="教官ブートキャンプ")
        .p_splatoon-body
          .p_splatoon-body-descript(v-if="mode")
            p 別名「教官なんでもお題箱」<br>心の中の教官がバトルのお題を出してくれます
            p: span.-small ※ たまに地獄みたいな結果が出ます
          .p_splatoon-body-descript(v-if="!mode")
            p(v-html="'たまに大事故が起きます'")
        .p_splatoon-body-inner
          .p_splatoon-body-header
            .p_splatoon-body-checkbox
              .c_aleart
                p(v-html="'⚠︎ お題を出すブキを選択してね ⚠︎'", v-if="Object.keys(weapon.currentSelect).length === 0")
              .p_splatoon-body-checkbox-col.c_col-c-pc.u_col-wrap
                .p_splatoon-body-checkbox-item.c_col.u_col-ai-c(v-touch:tap="true", :class="{ 'selected': selectWeaponType.indexOf('main') !== -1 }")
                  input.-input(type="checkbox", id="main", value="main", v-model="selectWeaponType")
                  i.-arr.-arr1
                    include inc/_ink
                  label.-label(for="main") メインを含める
                .p_splatoon-body-checkbox-item.c_col.u_col-ai-c(v-touch:tap="true", :class="{ 'selected': selectWeaponType.indexOf('sub') !== -1 }")
                  input.-input(type="checkbox", id="sub", value="sub", v-model="selectWeaponType")
                  i.-arr.-arr2
                    include inc/_ink
                  label.-label(for="sub") サブを含める
                .p_splatoon-body-checkbox-item.c_col.u_col-ai-c(v-touch:tap="true", :class="{ 'selected': selectWeaponType.indexOf('sp') !== -1 }")
                  input.-input(type="checkbox", id="sp", value="sp", v-model="selectWeaponType")
                  i.-arr.-arr3
                    include inc/_ink
                  label.-label(for="sp") スペシャルを含める
            .p_splatoon-body-button.c_col-c-pc(ref="result")
              .p_splatoon-body-button-item
                button.p_splatoon-body-button-button(type="button", @click="click", v-touch:tap="true", v-if="Object.keys(weapon.currentSelect).length > 0")
                  span.p_splatoon-body-button-start-bg.c_button_bg
                  span.p_splatoon-body-button-start(v-html="(mode ? 'ブートキャンプをする' : 'おみくじを引く')")
                button.p_splatoon-body-button-button(type="button", v-else)
                  span.p_splatoon-body-button-start-bg.c_button_bg
                  span.p_splatoon-body-button-start(v-html="(mode ? 'ブートキャンプをする' : 'おみくじを引く')")
              .p_splatoon-body-button-item
                button.p_splatoon-body-button-button(type="button", @click="reset", v-touch:tap="true")
                  span.p_splatoon-body-button-reset-bg.c_button_bg
                  span.p_splatoon-body-button-reset リセット
          .p_splatoon-body-result.c_col-c
            .p_splatoon-body-text(v-if="msg.show")
              p
                span.-weapon(v-html="msg.randomWeapon")
                span.-text で
                br
                span.-assist(v-html="msg.assist")
                span.-count(v-html="msg.killCount + 'キル'")
                span.-text(v-html="msg.text + msg.face + (mode ? msg.comment : '')")
            .p_splatoon-body-standby(v-else)
              p.-standby.c_col-c
                span.-face(v-html="msg.face", v-for="i in 3")
          .p_splatoon-body-share
            .p_share
              .p_share-header
                h2.p_share-heading(v-html="mode ? 'SNS でお題をシェアする' : 'シェアして有言実行する！'")
              .p_share-body
                .p_share-sns
                  ul.p_share-sns-list.c_col-c
                    li.p_share-sns-item
                      a.p_share-sns-link.c_col-c(:href!="'http://twitter.com/intent/tweet?text=' + encodeURIComponent(task)", target="_blank", ref="noreferrer noopener", v-touch:tap="true")
                        span.-image.-tw
                          include inc/icn_tw
                    li.p_share-sns-item
                      a.p_share-sns-link.c_col-c(:href!="'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('https://ikamikuji.inudog.me')", target="_blank", ref="noreferrer noopener", v-touch:tap="true")
                        span.-image.-fb
                          include inc/icn_fb
                    li.p_share-sns-item
                      a.p_share-sns-link.c_col-c(:href!="'http://line.me/R/msg/text/?' + encodeURIComponent(task)", target="_blank", ref="noreferrer noopener", v-touch:tap="true")
                        span.-image.-line
                          include inc/icn_line
                .p_share-text_to_copy
                  textarea.p_share-textarea(v-model="task")
        .p_splatoon-footer
          p.p_splatoon-footer-text(v-if="mode")
            a(href="https://twitter.com/_incolors", target="_blank", ref="noreferrer noopener")
              span.-text 作った人&ensp;→&ensp;@_incolors
          p.p_splatoon-footer-text(v-else) Vue.js でつくりました
</template>

<script>
// import firebase from '~/plugins/firebase.js'
export default {
  name: 'HelloWorld',
  data() {
    return {
      basicShareText:
        '#スプラトゥーン_教官ブートキャンプ\nhttps://ikamikuji.inudog.me',
      task: '',
      selectWeaponType: ['main'],
      mode: true,
      allMainWeapons: [],
      msg: {
        show: false,
        face: '( ´◔‿ゝ◔`)',
        randomWeapon: '',
        assist: '',
        killCount: '',
        text: '取ってこい！',
        comment: ''
      },
      weapon: {
        currentSelect: [],
        sp: [
          // スペシャル
          '<span class="-sub-text1">スペシャルが</span>ジェットパック<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>スーパーチャクチ<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>マルチミサイル<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>ハイパープレッサー<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>アメフラシ<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>ボムピッチャー<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>インクアーマー<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>イカスフィア<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>バブルランチャー<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>ナイスダマ<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">スペシャルが</span>ウルトラハンコ<span class="-sub-text2">のブキ</span>'
        ],
        sub: [
          // サブ
          '<span class="-sub-text1">サブが</span>スプラッシュボム<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>キューバンボム<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>クイックボム<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>スプリンクラー<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>ジャンプビーコン<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>スプラッシュシールド<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>ポイントセンサー<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>トラップ<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>カーリングボム<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>ロボットボム<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>ポイズンミスト<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>タンサンボム<span class="-sub-text2">のブキ</span>',
          '<span class="-sub-text1">サブが</span>トーピード<span class="-sub-text2">のブキ</span>'
        ],
        main: ['推しブキ', '苦手ブキ', '珍ブキ']
      },
      directive: {
        kill: {
          minimum: 3,
          maximum: 15
        }
      }
    }
  },
  watch: {
    selectWeaponType() {
      this.createWeaponsArray()
    }
  },
  asyncData({ $axios }) {
    return $axios
      .get('https://splatoon2.ink/data/locale/ja.json')
      .then(data => {
        const allWeapons = data.data.weapons
        const allWeaponsNewArr = []
        Object.keys(allWeapons).forEach(val => {
          allWeaponsNewArr.push(allWeapons[val].name)
        })
        return {
          allMainWeapons: allWeaponsNewArr
        }
      })
  },
  created() {
    this.weapon.main = this.weapon.main.concat(this.allMainWeapons)
    this.task = this.basicShareText
    const weapon = this.weapon
    weapon.currentSelect = weapon.main
    if (process.browser) {
      this.mode = process.env.NODE_ENV !== 'portfolio'
    }
  },
  methods: {
    reset() {
      this.msg.show = false
      this.task = this.basicShareText
      this.selectWeaponType = ['main']
    },
    scrollToResultSection() {
      if (process.browser) {
        const resultSection = this.$refs.result
        const rect = resultSection.getBoundingClientRect()
        const position = rect.top + window.scrollY
        TweenLite.to(window, 0.8, {
          scrollTo: { y: position - 20, autoKill: false }
        })
      }
    },
    createWeaponsArray() {
      const weapon = this.weapon
      const weaponType = this.selectWeaponType
      const length = weaponType.length
      let allWeaponArray = []

      if (length > 0) {
        weaponType.forEach(x => {
          allWeaponArray = allWeaponArray.concat(weapon[x])
          console.log(weapon)
        })
      } else {
        // this.selectWeaponType.push('main')
        // allWeaponArray = weapon.main
      }
      weapon.currentSelect = allWeaponArray
      console.log(allWeaponArray)
    },
    click() {
      const weapon = this.weapon.currentSelect
      const directive = this.directive
      const min = directive.kill.minimum
      const max = directive.kill.maximum
      const msg = this.msg
      const assist = Math.random() >= 0.5 ? '' : 'アシストなし'
      const randomWeapon = weapon[Math.floor(Math.random() * weapon.length)]
      const killCount = Math.floor(Math.random() * (max - min + 1)) + min
      const comment = Math.random() >= 0.5 ? '（厳しい）' : '（緩い）'
      const basicShareText =
        '#スプラトゥーン_教官ブートキャンプ\nhttps://ikamikuji.inudog.me'

      if (Object.keys(weapon).length > 0) {
        msg.randomWeapon = randomWeapon
        msg.assist = assist
        msg.killCount = killCount
        msg.comment = comment
        msg.show = true

        const marugoShareText = [
          '教官「【',
          randomWeapon.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
          '】で【',
          assist.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
          killCount,
          'キル】',
          msg.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
          msg.face.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
          comment.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
          '」\n',
          basicShareText
        ]
        const otherShareText = [
          '【',
          randomWeapon.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
          '】で【',
          assist.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
          killCount,
          'キル】',
          msg.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
          msg.face.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
        ]
        const shareText = this.mode ? marugoShareText : otherShareText
        this.task = shareText.join('')
        console.log(this.weapon.currentSelect)
      } else {
        this.task = this.basicShareText
      }
      if (this.$store.state.isSmartPhone) {
        this.scrollToResultSection()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.c_aleart {
  color: #ff0000;
  font-size: rem(13);
  min-height: rem(20);
}

.c_button_bg {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.p_splatoon {
  padding: rem(40) 0 rem(180);

  &-inner {
    min-width: rem(300);
    max-width: rem(600);
    margin: 0 auto;
  }

  &-header {
    margin: 0 0 rem(30);
  }

  &-heading {
    .-omikuji {
      width: rem(320);
      margin: 0 auto;
      display: block;
    }

    .-bootcamp {
      width: rem(320);
      margin: 0 auto;
      display: block;
    }

    img {
      width: 100%;
      display: block;
    }
  }

  &-body {
    &-descript {
      font-size: rem(14);
      font-weight: bold;
      text-align: center;

      p {
        &:not(:last-child) {
          margin: 0 0 rem(15);
        }
      }

      .-small {
        font-size: rem(12);
      }
    }

    &-inner {
      margin: rem(20) 0 0;
    }

    &-header {
      @include pc {
        margin: 0 0 rem(56);
      }
      @include sp {
        margin: 0 0 rem(32);
      }
    }

    &-checkbox {
      &-header {
      }

      &-heading {
        font-weight: bold;
      }

      &-col {
      }

      &-item {
        @include pc {
          width: calc(50% - 16px);
          margin: 0 0 16px;
        }
        @include sp {
          max-width: rem(280);
          margin: 0 auto 16px;
        }
        position: relative;
        min-height: 1.6em;
        border-radius: 10px;
        background: url('~assets/img/bg.png') center center repeat;
        background-size: 70px auto;
        background-color: rgba(#000, 0.8);
        border-bottom: 8px solid rgba(#000, 0.9);
        transition: all 0.15s ease-in-out;

        &.tap,
        &.selected {
          cursor: pointer;
          transform: scale(1.05);
        }

        @include pc {
          &:not(:nth-child(2n + 1)) {
            margin: 0 0 16px 32px;
          }
        }

        &::before {
          content: '';
          width: 100%;
          height: 50%;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: block;
          // background: rgba(#000, .9);
        }

        .-input {
          width: rem(40);
          height: rem(40);
          display: block;

          &:checked {
          }

          &:checked + .-arr {
            display: block;
            width: rem(40);
            height: rem(55);
            position: absolute;
            margin: auto;
            top: 0;
            left: rem(10);
            // right: 0;
            transform: translateY(-20%);

            &1 {
              fill: #ffed00;
            }

            &2 {
              fill: #42ff11;
            }

            &3 {
              fill: #ff327c;
            }
          }
        }
        .-label {
          color: #fff;
          position: relative;
          display: block;
          font-weight: bold;
          font-size: rem(18);
          text-align: center;
          flex-grow: 1;
          margin: 0 0 0 rem(-40);
          padding: rem(14) 0;
        }
      }
    }

    &-button {
      margin: rem(24) 0 0;

      &-item {
        @include pc {
          &:nth-child(2n + 1) {
            margin: 0 rem(15) 0 0;
          }
        }
        @include sp {
          &:nth-child(2n + 1) {
            margin: 0 0 rem(10);
          }
        }
        text-align: center;
      }

      &-button {
        position: relative;
        padding: 0 0 rem(8);

        &.tap .p_splatoon-body-button-start {
          transform: translateY(8px);
        }

        &.tap .p_splatoon-body-button-reset {
          transform: translateY(8px);
        }
      }

      &-start {
        width: rem(320);
        color: #fff;
        font-size: rem(22);
        font-weight: bold;
        position: relative;
        display: block;
        padding: rem(18) rem(20);
        background: url('~assets/img/bg.png') center center repeat;
        background-size: 70px auto;
        background-color: #7333f5;
        border-radius: 72px;
        transform: translateY(0);

        &-bg {
          border-radius: 72px;

          &::before {
            background: #33197b;
          }
        }
      }

      &-reset {
        @include pc {
          width: 150px;
          padding: rem(22) rem(18);
          font-size: rem(16);
          border-radius: 44px;
        }
        @include sp {
          width: rem(320);
          padding: rem(10) rem(18);
          font-size: rem(14);
          border-radius: 41px;
        }
        font-weight: bold;
        position: relative;
        display: block;
        background: url('~assets/img/bg2.png') center center repeat;
        background-size: 60px auto;
        background-color: #ffee00;
        transform: translateY(0);

        &-bg {
          border-radius: 44px;

          &::before {
            background: #dacf51;
          }
        }
      }
    }

    &-result {
      width: 100%;
      min-height: rem(210);
      background: url('~assets/img/bg2.png') center center repeat;
      background-size: 70px auto;
      background-color: #ff468b;
      border-radius: 30px;
      padding: rem(20);
    }

    &-text {
      color: #fff;
      font-size: rem(14);
      font-weight: bold;
      text-align: center;

      p {
        &:not(:last-child) {
          margin: 0 0 rem(15);
        }
      }
    }

    &-share {
    }
  }

  .p_share {
    padding: rem(56) 0 0;

    &-header {
      margin: 0 0 rem(10);
      text-align: center;
    }

    &-heading {
      font-size: rem(15);
      font-weight: bold;
    }

    &-body {
    }

    &-sns {
      &-list {
        margin: 0 0 rem(16);
      }

      &-item {
      }

      &-link {
        width: rem(48);
        height: rem(48);

        &.tap {
          transform: scale(1.3);
        }

        svg {
          width: 100%;
          display: block;
        }

        .-tw {
          width: rem(30);
          fill: $palet_tw;
          display: block;
        }
        .-fb {
          width: rem(30);
          fill: $palet_fb;
          display: block;
        }
        .-line {
          width: rem(33);
          fill: $palet_line;
          display: block;
        }
      }
    }

    &-text_to_copy {
      text-align: center;
    }

    &-textarea {
      width: 100%;
      max-width: rem(400);
      margin: 0 auto;
      border-radius: 4px;
      background: rgba(#000, 0.08);
      padding: rem(15);
    }
  }

  &-footer {
    margin: rem(40) 0 0;

    a {
      display: inline-block;
      border-bottom: 1px solid;
      color: $a;
      text-decoration: none;
    }

    &-text {
      font-size: rem(12);
      text-align: center;
    }
  }

  &-button {
  }
}
</style>
<style lang="scss">
.p_splatoon {
  &-body {
    &-text {
      .-weapon {
        font-size: rem(24);
        font-weight: bold;
      }

      .-assist {
        font-size: rem(20);
        font-weight: bold;
        margin: 0 rem(8) 0 0;
      }
      .-count {
        font-size: rem(20);
        font-weight: bold;
      }

      .-text {
        font-size: rem(14);
        font-weight: bold;
        margin: 0 rem(8);
      }

      .-sub-text1 {
        font-size: rem(14);
        font-weight: bold;
        margin: 0 rem(8) 0 0;
      }

      .-sub-text2 {
        font-size: rem(14);
        font-weight: bold;
        margin: 0 0 0 rem(8);
      }
    }

    &-standby {
      width: 100%;
      position: relative;

      .-standby {
        .-face {
          @include pc {
            font-size: rem(16);
            padding: 0 rem(16);
          }
          @include sp {
            font-size: rem(16);
            padding: 0 rem(10);
          }
          color: #fff;
          font-weight: bold;
          display: block;

          &:nth-child(1) {
            animation: face 0.5s linear 0.5s infinite;
          }
          &:nth-child(2) {
            animation: face_re 1.2s linear 1.2s infinite;
          }
          &:nth-child(3) {
            animation: face 0.9s linear 0.9s infinite;
          }
        }
      }

      @keyframes face {
        0% {
          // opacity: 1;
          transform: rotate(0deg);
        }
        100% {
          // opacity: 0.1;
          transform: rotate(360deg);
        }
      }
      @keyframes face_re {
        0% {
          // opacity: 1;
          transform: rotate(0deg);
        }
        100% {
          // opacity: 0.1;
          transform: rotate(-360deg);
        }
      }
    }
  }
}
</style>

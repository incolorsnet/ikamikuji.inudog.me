import mutation from './mutations'

export const state = () => ({
  meta: {
    title: 'のくら - スーツとモブ顔を愛してやまない漫画家｜Suit is Good.'
  },
  isLoading: true,
  windowHeight: process.client ? document.body.clientHeight : '',
  useLoadingWindow: true,
  showEyecatch: false,
  isSmartPhone: true,
  pageTitle: null,
  resizeCount: 0,
  baseUrl: process.env.baseURL,
  navi: {
    urlList: [],
    currentPos: [],
    width: {}
  },
  params: [],

  api: {
    wpDomain: process.env.wpDomain
  }
})

export const actions = {
  isSmartPhone({ commit, state }) {
    const reSize = () => {
      if (process.browser) {
        if (window.innerWidth < 769) {
          commit('IS_SMARTPHONE', true)
        } else {
          commit('IS_SMARTPHONE', false)
        }
        commit('WINDOW_HEIGHT', document.body.clientHeight)
      }
    }
    reSize()
    window.addEventListener('resize', reSize)
  }
}

export const mutations = mutation

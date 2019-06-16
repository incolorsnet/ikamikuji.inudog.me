const mutations = {
  IS_LOADING(state, value) {
    state.isLoading = value
  },
  SHOW_EYECATCH(state, value) {
    state.showEyecatch = value
  },
  BASE_URL(state, value) {
    state.baseUrl = value
  },
  IS_SMARTPHONE(state, value) {
    state.isSmartPhone = value
  },
  WINDOW_HEIGHT(state, value) {
    state.windowHeight = value
  },
  PAGE_TITLE(state, value) {
    state.pageTitle = value
  },
  RESIZE_COUNT(state, value) {
    state.resizeCount = value
  },
  NAVI_ALL(state, value) {
    state.navi.all = value
  },
  NAVI_LIST(state, value) {
    state.navi.list = value
  },
  NAVI_CURRENT_POS(state, value) {
    state.navi.currentPos = value
  },
  NAVI_ITEM_WIDTH(state, value) {
    state.navi.width = value
  },
  PARAMS_QUERY(state, value) {
    state.params = value
  },

  // POSTS
  API_TOP_NEWS_POSTS(state, value) {
    state.api.top.news.posts = value
  },
  API_TOP_SERVICE_POSTS(state, value) {
    state.api.top.service.posts = value
  },

  API_ABOUT_COMPANY_POSTS(state, value) {
    state.api.about.company.posts = value
  },
  API_ABOUT_HISTORY_POSTS(state, value) {
    state.api.about.history.posts = value
  },

  API_SERVICE_ALL_POSTS(state, value) {
    state.api.service.allPosts = value
  },
  API_SERVICE_POST(state, value) {
    state.api.service.post = value
  },

  API_RECRUIT_ALLCAT_ITEMS(state, value) {
    state.api.recruit.allCat.items = value
  },
  API_RECRUIT_POST_POST(state, value) {
    state.api.recruit.post.post = value
  },
  API_RECRUIT_POST_CUSTOMFIELDS(state, value) {
    state.api.recruit.post.customFileds = value
  },
  API_RECRUIT_POST_POSTS(state, value) {
    state.api.recruit.post.posts = value
  },
  API_RECRUIT_ARCHIVE(state, value) {
    state.api.recruit.archive = value
  },
  API_RECRUIT_BENEFIT(state, value) {
    state.api.recruit.benefit.posts = value
  },
  API_RECRUIT_EVENTS(state, value) {
    state.api.recruit.events.posts = value
  },
  API_RECRUIT_UNIQUE_SYSTEM(state, value) {
    state.api.recruit.uniqueSystem.posts = value
  },

  API_INTERVIEW_ALLPOSTS(state, value) {
    state.api.interview.allPosts = value
  },
  API_INTERVIEW_POST(state, value) {
    state.api.interview.post = value
  },
  API_INTERVIEW_ARCHIVE(state, value) {
    state.api.interview.archive = value
  },

  API_NEWS_ALL_HEAD(state, value) {
    state.api.news.all.head = value
  },
  API_NEWS_ALL_POSTS(state, value) {
    state.api.news.all.posts = value
  },
  API_NEWS_CATEGORY_POSTS(state, value) {
    state.api.news.category.posts = value
  },

  // API_NEWS_TOPICS_HEAD(state, value) {
  //   state.api.news.topics.head = value
  // },
  // API_NEWS_TOPICS_POSTS(state, value) {
  //   state.api.news.topics.posts = value
  // },
  //
  // API_NEWS_SERVICENEWS_HEAD(state, value) {
  //   state.api.news.serviceNews.head = value
  // },
  // API_NEWS_SERVICENEWS_POSTS(state, value) {
  //   state.api.news.serviceNews.posts = value
  // },

  API_NEWS_POST_POST(state, value) {
    state.api.news.post.post = value
  }
}

export default mutations

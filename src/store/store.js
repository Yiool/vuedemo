import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  showLoading: false,
  showWelcome:true,
  showNav:true,
  detail:{},
  collection:[]
};

const mutations = {
  showLoading: function (state) {
    state.showLoading = true;
  },
  hideLoading:function(state){
    state.showLoading = false;
  },
  hideWelcome:function(state){
    state.showWelcome = false;
  },
  hideNav:function(state){
    state.showNav = false;
  },
  showNav:function(state){
    state.showNav = true;
  },
  sendData:function(state,payload){
    console.log(payload);
    state.detail = payload;
  },
  cacheData:function(state){
    state.collection.push = state.detail;
  }
};

const actions = {
}

const getters = {

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

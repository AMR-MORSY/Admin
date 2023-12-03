import { createStore } from "vuex";
const store = createStore({
  state: {
    userData: JSON.parse(sessionStorage.getItem("User")),
    
    displaySpinnerPage: false,
    showUnauthenticatedToast:false,
  
  },
  getters: {
    isLogin(state) {
      return state.userData;
    },
    token(state) {
     
      if (state.userData) {
        let userToken = state.userData.token.plainTextToken;
        
        return userToken;
      } else {
        let userToken = null;

        return userToken;
      }
    },
   
    // userName(state) { 
    // if (state.userData) {
    //     let userName = state.userData.user.name;
    
    
    //     return userName;
    //   } else {
    //     let userName = null;
    //     return userName;
    //   }
    // },
    showUnauthenticatedToast(state)
    {
      return state.showUnauthenticatedToast;
    }
  },
  mutations: {
  
    USER_DATA(state, user) {
      state.userData = user;
    },
  
  
    DISPLAY_SPINNER(state, status) {
      state.displaySpinnerPage = status;
    },
    SHOW_UNAUTH_TOAST(state,status)
    {
      state.showUnauthenticatedToast=status;
    }

  },
  actions: {
  
    userData({ commit }, user) {
      commit("USER_DATA", user);
    },
   
    displaySpinnerPage({ commit }, status) {
      commit("DISPLAY_SPINNER", status);
    },
    showUnauthToast({commit},status)
    {
      commit("SHOW_UNAUTH_TOAST",status)
    }
    
  
  },
});
export default store;

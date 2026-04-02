import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    openAddPostModal: false,
    openEditProfileModal: false,
    anchorE1: null,
    anchorE2: null,
    darkMode: false,
    loading: false,
    myInfo: null,
    user: {},
    allPosts: [],
    postId: null,
    searchedUsers: [],
  },
  reducers: {
    addPostModal: (state, action) => {
      state.openAddPostModal = action.payload;
    },
    editProfileModal: (state, action) => {
      state.openEditProfileModal = action.payload;
    },
    toggleMainMenu: (state, action) => {
      state.anchorE1 = action.payload;
    },
    toggleMyMenu: (state, action) => {
      state.anchorE2 = action.payload;
    },
    toggleColorMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    addMyInfo: (state, action) => {
      state.myInfo = action.payload.me;
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addSingle: (state, action) => {
      const newArr = [action.payload.newPost, ...state.allPosts];
      const uniqueIds = new Set();
      state.allPosts = newArr.filter((e) => {
        if (!uniqueIds.has(e._id)) {
          uniqueIds.add(e._id);
          return true;
        }
        return false;
      });
    },
    addToAllPost: (state, action) => {
      const newPostArr = action.payload.posts;
      const existingPosts = [...state.allPosts];
      newPostArr.forEach((e) => {
        const idx = existingPosts.findIndex((i) => i._id === e._id);
        if (idx !== -1) existingPosts[idx] = e;
        else existingPosts.push(e);
      });
      state.allPosts = existingPosts;
    },
    deleteThePost: (state, action) => {
      state.allPosts = state.allPosts.filter((e) => e._id !== state.postId);
    },
    addPostId: (state, action) => {
      state.postId = action.payload;
    },
    addToSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },

    //  New loading reducer
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    //  update profile locally
    updateProfileLocal: (state, action) => {
      if (state.myInfo) {
        state.myInfo = {
          ...state.myInfo,
          bio: action.payload.bio || state.myInfo.bio,
          profilePic: action.payload.profilePic || state.myInfo.profilePic,
        };
      }
    },
  },
});

export const {
  addPostId,
  addPostModal,
  editProfileModal,
  toggleMainMenu,
  toggleMyMenu,
  toggleColorMode,
  addMyInfo,
  addUser,
  addSingle,
  addToAllPost,
  deleteThePost,
  addToSearchedUsers,
  setLoading,
  updateProfileLocal,
} = serviceSlice.actions;

export default serviceSlice.reducer;
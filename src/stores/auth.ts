import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import type {AnyObject} from "ant-design-vue/es/_util/type";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    // TODO :: localStorage User 정보 처리방안 고민
    user: JSON.parse( typeof undefined !== localStorage.getItem('user') ? localStorage.getItem('user') : "{}"),
    // user: JSON.parse("{}"),
    // user: null,
    returnUrl: null
  }),
  actions: {
    getUserInfo(){
      try {
        const uData = localStorage.getItem('user')
        if(uData !== undefined){
          return JSON.parse(<string>uData)
        }else{
          return null;
        }
      } catch (error) {
        return null;
      }
    },
    async login(username: string, password: string) {

      let param = {
        userid: username,
        userpw: password
      };

      // const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });
      console.log("param",param)

      let res_user = {token : "", id: "", username : ""};
      await fetchWrapper
        .post(`/api/rcbk/user/login`, param)
        .then((res) => {
          console.log(res);
          res_user.id = res.data.body.userid;
          res_user.username = res.data.body.username;
          res_user.token = res.data.body.token;
        })
        .catch((err) => {
          console.log(err);
        })



      // update pinia state
      this.user = res_user;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(res_user));
      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/dashboard');
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
  }
});

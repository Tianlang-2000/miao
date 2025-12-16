import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

type UserInfo = {
  avatar: string,
  name: string,
  userId: number | string, 
}

export const useVoteStore = defineStore('vote', () => {
   const user = ref<null | UserInfo>(null)
   async function getUserInfo() {
      try {
         let userInfo = await axios.get('/account/current-user')
         user.value = userInfo.data.result
      } catch (e) {
         if (e instanceof axios.AxiosError) {
            console.log('user not logged in')
         } else {
            throw e
         }
      }
   }
   return { user, getUserInfo }
})

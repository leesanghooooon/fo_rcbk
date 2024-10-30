<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
const show1 = ref(false);
const password = ref('');
const email = ref('');
const Regform = ref();
const username = ref('');
const hp = ref('');
let gender = ref('');
const userid = ref('');

const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const firstRules = ref([(v: string) => !!v || 'First Name is required']);
const lastRules = ref([(v: string) => !!v || 'Last Name is required']);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

function validate() {

  const x = alert("dsdas")
  console.log(x)

  // const validate = Regform.value.validate();
  const validate = false;
  // Call SingUp API
  if(validate){
    const authStore = useAuthStore();
    const reqParam = {
      userid: userid.value
      , userpw : password.value
      , username : username.value
      , hp : hp.value
      , email : email.value
      , gender : gender.value
      , zipcode : ""
      , address1 : ""
      , address2 : ""
      , address3 : ""
    }
    return authStore.singUp(reqParam)
  }
}

// const authList = ref([
//   { name: 'Male', value: 'MAIE'},
//   { name: 'Female', value: 'FEMALE'}
// ]);
let genderItems = ref(['MAIE', 'FEMALE']);

</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">Sign up</h3>
    <router-link to="/auth/login" class="text-primary text-decoration-none">Already have an account?</router-link>
  </div>
  <v-form ref="Regform" lazy-validation action="/dashboards/analytical" class="mt-7 loginForm">
    <v-row class="my-0">
      <v-col cols="12" sm="6" class="py-0">
        <div class="mb-6">
          <v-label>Account*</v-label>
          <v-text-field
            v-model="userid"
            hide-details="auto"
            required
            variant="outlined"
            class="mt-2"
            color="primary"
            placeholder="John"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="py-0">
        <div class="mb-6">
          <v-label>Name*</v-label>
          <v-text-field
            v-model="username"
            hide-details="auto"
            required
            variant="outlined"
            class="mt-2"
            color="primary"
            placeholder="Doe"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="8" class="py-0">
        <div class="mb-8">
          <v-label>Phone Number*</v-label>
          <v-text-field v-model="hp" hide-details="auto" variant="outlined" class="mt-2" color="primary" placeholder="Demo Inc."></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="py-0">
        <div class="mb-4">
          <v-label>Gender*</v-label>
          <v-select
              class="mt-2"
              color="primary"
              v-model="gender"
              :items="genderItems"></v-select>
        </div>
      </v-col>
    </v-row>
    <div class="mb-6">
      <v-label>Email Address*</v-label>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        placeholder="demo@company.com"
        class="mt-2"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
      ></v-text-field>
    </div>
    <div class="mb-6">
      <v-label>Password*</v-label>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        placeholder="*****"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="mt-2"
      >
        <template v-slot:append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == false" @click="show1 = !show1" />
            <EyeOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == true" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-sm-inline-flex align-center mt-2 mb-7 mb-sm-0 font-weight-bold">
      <h6 class="text-caption">
        By Signing up, you agree to our
        <router-link to="/auth/register" class="text-primary link-hover font-weight-medium">Terms of Service </router-link>
        and
        <router-link to="/auth/register" class="text-primary link-hover font-weight-medium">Privacy Policy</router-link>
      </h6>
    </div>
    <v-btn color="primary" block class="mt-4" variant="flat" size="large" @click="validate()">Create Account</v-btn>
  </v-form>
</template>

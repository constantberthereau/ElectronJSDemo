<template>
  <div class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
    <div class="uk-width-medium uk-padding-small">
      <form @submit.prevent="sign">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip"></span>
              <input v-model="email" class="uk-input uk-border-pill" required placeholder="email" type="text" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip"></span>
              <input v-model="pseudo" class="uk-input uk-border-pill" required placeholder="Pseudo" type="text" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" ></span>
              <input v-model="cityCode" class="uk-input uk-border-pill" required placeholder="Code postal" type="text" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip"></span>
              <input v-model="city" class="uk-input uk-border-pill" required placeholder="Ville" type="text" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip"></span>
              <input v-model="phone" class="uk-input uk-border-pill" required placeholder="Téléphone" type="text" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip"></span>
              <input v-model="password" class="uk-input uk-border-pill" required placeholder="Mot de passe" type="password" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip"></span>
              <input v-model="passwordConfirm" class="uk-input uk-border-pill" required placeholder="Confirmer mot de passe" type="password" />
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1" :disabled="loading">
              <span v-if="!loading">S'inscrire</span>
              <span v-else>Loading...</span>
            </button>
          </div>
        </fieldset>
      </form>
      <button class="uk-button uk-button-link" @click="$router.push('/')" :disabled="loading">
        <span>Se connecter</span>
      </button>
      <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Inscrire",
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      pseudo:"",
      cityCode:"",
      city:"",
      phone: "",
      loading: false,
      errorMessage: null,
    }
  },
  methods: {
    async sign() {
      this.loading = true
      this.errorMessage = null
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            pseudo:this.pseudo,
            cityCode:this.cityCode,
            city:this.city,
            phone: this.phone,}
          )
        })

        const data = await response.json()
        if (data.code && data.code !== "200") {
          throw new Error(data.message || "Erreur de connexion")
        }

        if (data.token) {
          localStorage.setItem("token", data.token)
        }

        this.$router.push("/")
      } catch (err) {
        this.errorMessage = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

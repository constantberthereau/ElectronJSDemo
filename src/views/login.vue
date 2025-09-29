<template>
  <div class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" data-uk-height-viewport>
    <div class="uk-width-medium uk-padding-small">
      <form @submit.prevent="login">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input v-model="email" class="uk-input uk-border-pill" required placeholder="email" type="text" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input v-model="password" class="uk-input uk-border-pill" required placeholder="Mot de passe" type="password" />
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1" :disabled="loading">
              <span v-if="!loading">Se connecter</span>
              <span v-else>Chargement...</span>
            </button>
          </div>
        </fieldset>
      </form>
      <button class="uk-button uk-button-link" @click="$router.push('Inscrire')" :disabled="loading">
        <span>S'inscrire</span>
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
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: null,
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.errorMessage = null
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          })
        })

        const data = await response.json()
        if (data.code && data.code !== "200") {
          throw new Error(data.message || "Erreur de connexion")
        }
        if (data.token) {
          localStorage.setItem("token", data.token)
        }

        this.$router.push("/dashboard")
      } catch (err) {
        this.errorMessage = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <AppBar title="Edition d'un article" />
  <div class="uk-container uk-margin-top">
    <button @click="$router.back()" class="uk-button uk-button-default uk-border-pill uk-margin-bottom">
      <span uk-icon="arrow-left"></span> Retour
    </button>

    <div v-if="article" class="uk-card uk-card-default uk-card-body uk-width-2-3@m uk-align-center uk-box-shadow-medium uk-border-rounded uk-animation-fade">
      <h2 class="uk-heading-medium uk-margin-small-top">Modifier l'article</h2>

      <div class="uk-margin">
        <input v-model="form.title" class="uk-input uk-border-pill" placeholder="Titre" />
      </div>
      <div class="uk-margin">
        <input v-model="form.author" class="uk-input uk-border-pill" placeholder="Auteur" />
      </div>
      <div class="uk-margin">
        <textarea v-model="form.desc" class="uk-textarea uk-border-rounded" rows="5" placeholder="Description"></textarea>
      </div>

      <button @click="saveArticle" class="uk-button uk-button-success uk-border-pill uk-width-1-1 uk-margin-small-top">
        <span uk-icon="check"></span> Enregistrer
      </button>

      <div v-if="successMessage" class="uk-alert-success uk-margin-top" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{ successMessage }}</p>
      </div>

      <div v-if="errorMessage" class="uk-alert-danger uk-margin-top" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "./app_bar.vue";

export default {
  name: "ArticleEdit",
  components: {AppBar},
  data() {
    return {
      article: null,
      form: { title: "", desc: "", author: "" },
      errorMessage: null,
      successMessage: null,
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const res = await fetch(`http://localhost:3000/articles/${id}`)
      const data = await res.json()
      if (data.code !== "200") throw new Error(data.message)
      this.article = data.data
      this.form = { title: data.data.title, desc: data.data.desc, author: data.data.author }
    } catch (err) {
      this.errorMessage = err.message
    }
  },
  methods: {
    async saveArticle() {
      this.errorMessage = null
      this.successMessage = null
      try {
        const res = await fetch("http://localhost:3000/articles/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: this.article.id, ...this.form })
        })
        const data = await res.json()
        if (data.code !== "200") throw new Error(data.message)
        this.successMessage = data.message
        this.article = data.data
      } catch (err) {
        this.errorMessage = err.message
      }
    }
  }
}
</script>

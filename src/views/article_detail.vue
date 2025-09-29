<template>
  <AppBar title="Détail d'un article" />
  <div class="uk-container uk-margin-top">
    <button @click="$router.back()" class="uk-button uk-button-default uk-border-pill uk-margin-bottom">
      Retour
    </button>
    <div v-if="article" class="uk-card uk-card-default uk-card-body uk-width-2-3@m uk-align-center">
      <div class="uk-card-media-top uk-margin-small-bottom">
        <img :src="article.imgPath" alt="image article" class="uk-border-rounded" />
      </div>
      <h2 class="uk-card-title uk-margin-small-top">{{ article.title }}</h2>
      <p class="uk-text-small uk-text-muted">Par {{ article.author }}</p>
      <p class="uk-margin-small-top">{{ article.desc }}</p>
      <button @click="$router.push({ name: 'ArticleEdit', params: { id: article.id } })"
              class="uk-button uk-button-primary uk-border-pill uk-margin-top">
        Modifier
      </button>
    </div>

    <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import AppBar from "./app_bar.vue";

export default {
  name: "ArticleDetail",
  components: {AppBar},
  data() {
    return {
      article: null,
      errorMessage: null,
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const res = await fetch(`http://localhost:3000/articles/${id}`)
      const data = await res.json()
      if (data.code !== "200") throw new Error(data.message)
      this.article = data.data
    } catch (err) {
      this.errorMessage = err.message
    }
  }
}
</script>

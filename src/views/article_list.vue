<template>
  <AppBar title="Liste des articles" />
  <div class="uk-container uk-margin-top">
    <div v-if="loading" class="uk-text-center uk-margin">
      <span uk-spinner="ratio: 2"></span>
    </div>
    <div v-if="successMessage" class="uk-alert-success" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>{{ successMessage }}</p>
    </div>
    <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>{{ errorMessage }}</p>
    </div>
    <div v-if="articles.length" class="uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l uk-grid-small uk-grid-match" uk-grid>
      <div v-for="article in articles" :key="article.id">
        <div class="uk-card uk-card-default uk-card-hover uk-box-shadow-medium uk-card-body uk-border-rounded uk-flex uk-flex-column uk-animation-fade">
          <div class="uk-card-media-top uk-margin-small-bottom">
            <img :src="article.imgPath" alt="image article" class="uk-border-rounded" style="height:200px; width:100%; object-fit:cover;" />
          </div>
          <h3 class="uk-card-title uk-margin-small-top">{{ article.title }}</h3>
          <p class="uk-text-small uk-text-muted">Par {{ article.author }}</p>
          <p class="uk-flex-1 uk-text-break">{{ article.desc }}</p>
          <div class="uk-margin-small-top uk-flex uk-flex-center uk-flex-wrap">
            <button @click="$router.push({ name: 'ArticleDetail', params: { id: article.id } })"
                    class="uk-button uk-button-primary uk-border-pill uk-text-center uk-margin-small-right">
              <span uk-icon="icon: info"></span> Lire
            </button>
            <button @click="deleteArticle(article.id)"
                    class="uk-button uk-button-danger uk-border-pill uk-text-center">
              <span uk-icon="icon: trash"></span> Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "./app_bar.vue";

export default {
  name: "Dashboard",
  components: {AppBar},
  data() {
    return {
      articles: [],
      loading: false,
      errorMessage: null,
      successMessage: null,
    }
  },
  async created() {
    await this.fetchArticles()
  },
  methods: {
    async fetchArticles() {
      this.loading = true
      this.errorMessage = null
      try {
        const res = await fetch("http://localhost:3000/articles")
        const data = await res.json()
        if (data.code !== "200") throw new Error(data.message)
        this.articles = data.data
      } catch (err) {
        this.errorMessage = err.message
      } finally {
        this.loading = false
      }
    },
    async deleteArticle(id) {
      if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return
      this.loading = true
      this.errorMessage = null
      this.successMessage = null
      try {
        const res = await fetch(`http://localhost:3000/articles/${id}`, {
          method: "DELETE",
        })
        const data = await res.json()
        if (data.code !== "200") throw new Error(data.message)
        this.articles = this.articles.filter(a => a.id !== id)
        this.successMessage = data.message
      } catch (err) {
        this.errorMessage = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

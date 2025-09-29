import {createRouter, createWebHashHistory} from 'vue-router';
import Login from "../views/login.vue";
import ArticleList from "../views/article_list.vue";
import ArticleDetail from "../views/article_detail.vue";
import ArticleEdit from "../views/article_edit.vue";
import Inscrire from "../views/inscrire.vue";

const routes = [
    {path: '/', name: 'Login', component: Login},
    {path: '/inscrire', name: 'Inscrire', component: Inscrire},
    {path: '/edit', name: 'ArticleDetail', component: ArticleDetail},
    {path: "/articles/:id/edit", name: "ArticleEdit", component: ArticleEdit },
    {path: '/dashboard', name: 'Dashboard', component: ArticleList},
    {path: "/articles/:id", name: "ArticleDetail", component: ArticleDetail,}
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;
<template>
  <header>
    <nav class="uk-navbar-container uk-navbar-transparent custom-navbar" uk-navbar>
      <div class="uk-navbar-left">
        <a class="uk-navbar-item uk-logo" @click="$router.push({ name: 'Dashboard' })">
          <span uk-icon="icon: home"></span> Dashboard
        </a>
      </div>
      <div class="navbar-center">
        <span class="uk-navbar-item uk-text-bold">{{ title }}</span>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-inline">
          <a href="#" data-uk-icon="icon: user"></a>
          <div class="uk-navbar-dropdown uk-navbar-dropdown-bottom-left">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li class="uk-nav-header uk-text-small uk-text-primary">ACCOUNT</li>
              <li>
                <a @click="logout">
                  <span uk-icon="icon: sign-out"></span> Déconnexion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.custom-navbar {
  position: relative;
  width: 100%;
  padding: 0 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  box-sizing: border-box;
}

.navbar-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-weight: bold;
}
</style>

<script>
export default {
  name: "Navbar",

  methods: {
    logout() {
      localStorage.removeItem("token")

      this.$router.push({ name: "Login" })
    }
  }
}
</script>
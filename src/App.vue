<template>
  <div id="app">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <img alt="Frjálsíþróttasamband Íslands" src="./assets/logo.png" class="logo">
      <h5 class="my-0 mr-md-auto font-weight-normal">Félagatal FRÍ</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link to="/" class="p-2 text-dark">Félög</router-link>
        <router-link to="/idkendur" class="p-2 text-dark">Iðkendur</router-link>
      </nav>
      <a class="btn btn-outline-primary" href="#">Innskráning</a>
    </div>
    <div class="container">
      <div class="py-4 text-center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
img.logo {
  margin-right: 10px;
  width: 50px
}
h1 {
  text-transform: uppercase;
}
</style>

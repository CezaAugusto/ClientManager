<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <img src="./assets/logo.png" width="40" height="40" alt="ClientManager Logo" class="mr-3" />
        <b-navbar-brand href="/">ClientManager</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item active href="/">Inicio</b-nav-item>
            <b-nav-item>|</b-nav-item>
            <b-nav-item active href="../about">Sobre</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <router-view />
  </div>
</template>

<style>
</style>

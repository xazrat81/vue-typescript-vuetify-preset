<template>
    <v-app>
        <v-app-bar app color="primary">
            <nav class="header_nav_menu">
                <router-link to="/" exact>Home</router-link>
                <router-link to="/about">About</router-link>
            </nav>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
    
}
</script>

<style lang="scss" scoped>
nav.header_nav_menu {
    width: 100%;
    & a {
        color: #fff;
        padding: 24px 30px;
        text-decoration: none;
        &:hover, &.router-link-exact-active {
            background-color: #0f6ab2;
        }
    }
  }
</style>

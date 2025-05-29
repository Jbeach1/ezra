<template>
  <div class="layout-container">
    <!-- Top Navbar -->
    <Menubar class="top-navbar">
      <!-- Hamburger on left -->
      <template #start>
        <Button icon="pi pi-bars" class="p-button-text hamburger-btn" @click="toggleSidebar" />
      </template>

      <!-- Everything else on right -->
      <template #end>
        <Button icon="pi pi-home" class="p-button-text" @click="() => console.log('Home clicked')" />
        <Button icon="pi pi-info-circle" class="p-button-text" @click="() => console.log('About clicked')" />
        <Button icon="pi pi-user" class="p-button-text" @click="onUserClick" />
      </template>
    </Menubar>

    <!-- Sidebar (drawer) -->
    <Sidebar v-model:visible="sidebarVisible" :modal="false" position="left" class="side-menu">
      <h3>Menu</h3>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Groups</a></li>
        <li><a href="#">Studies</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </Sidebar>

    <!-- Main content -->
    <main class="content-area">
      <slot />
      <h2>Content goes here</h2>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'

const sidebarVisible = ref(false)

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const onUserClick = () => {
  console.log('User icon clicked')
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-navbar {
  flex: 0 0 auto;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hamburger-btn {
  margin-left: 0.5rem;
}

.side-menu {
  width: 250px;
  padding: 1rem;
}

.content-area {
  flex: 1 1 auto;
  padding: 1rem;
  overflow-y: auto;
}
</style>

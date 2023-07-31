// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import DashboardComponent from '../components/DashboardComponent.vue';
import ManageAgentComponent from '../components/ManageAgentComponent.vue';
import ChatComponent from '../components/ChatComponent.vue';
import UploadComponent from '../components/UploadComponent.vue';
import ManageUserComponent from '../components/ManageUserComponent.vue';
import ManageOrganizationComponent from '../components/ManageOrganizationComponent.vue';
import ManageKeysComponent from '../components/ManageKeysComponent.vue';
// import { authGuard } from "@auth0/auth0-vue";

const routes = [
  { path: '/', component: LoginComponent },
  { path: '/dashboard', component: DashboardComponent },
  { path: '/manage-agent/:agent_namespace?', component: ManageAgentComponent },
  { path: '/chat/:agent_namespace', component: ChatComponent },
  { path: '/upload/:agent_namespace', component: UploadComponent },
  { path: '/manage-user/:user_id', component: ManageUserComponent },
  { path: '/manage-organization', component: ManageOrganizationComponent },
  { path: '/manage-keys', component: ManageKeysComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add the authGuard middleware
// router.beforeEach(authGuard);

export default router;

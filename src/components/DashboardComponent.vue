<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">Dashboard</h2>
            </div>
          </div>
          <div class="flex flex-wrap space-x-4">
            <button v-if="isOwner" @click="showModal('manageUser')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Manage Users
            </button>
            <button v-if="isOwner" @click="showModal('manageOrganization')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Manage Organization
            </button>
            <button @click="showModal('manageAgent')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Manage Agents
            </button>
            <button @click="showModal('manageKeys')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Manage Keys
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeModal" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
      <div class="bg-white p-5 shadow-xl rounded-md relative" style="max-height: 80%; overflow-y: auto; min-width: 60%; overflow-x: auto;">
        <button @click="closeModal" class="absolute top-2 left-2 text-gray-700 hover:text-gray-900">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </button>
        <manage-user v-if="activeModal === 'manageUser'" />
        <manage-organization v-if="activeModal === 'manageOrganization'" />
        <manage-agent v-if="activeModal === 'manageAgent'" />
        <manage-keys v-if="activeModal === 'manageKeys'" />
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import ManageUser from "./ManageUserComponent.vue";
import ManageOrganization from "./ManageOrganizationComponent.vue";
import ManageAgent from "./ManageAgentComponent.vue";
import ManageKeys from "./ManageKeysComponent.vue";

export default {
  components: {
    ManageUser,
    ManageOrganization,
    ManageAgent,
    ManageKeys,
  },
  data() {
    return {
      isOwner: false,
      activeModal: null,
    };
  },
  methods: {
    showModal(modalName) {
      this.activeModal = modalName;
    },
    closeModal() {
      this.activeModal = null;
    },
  },
  async mounted() {
    const { getIdTokenClaims } = useAuth0();
    const claims = await getIdTokenClaims();
    const jwt = claims.__raw;

    // Fetch user ownership status from the backend
    try {
      const response = await fetch("/dashboard/", {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      this.isOwner = data.is_owner;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  },
};
</script>

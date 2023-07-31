<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-primary">
            Manage Agent
          </h3>
        </div>
        <!-- Add links to the chat and upload pages -->
        <div class="px-4 py-5 sm:px-6">
          <router-link :to="`/chat/${agentNamespace}`" class="text-primary font-medium">
            Chat with Agent
          </router-link>
          <router-link :to="`/upload/${agentNamespace}`" class="ml-4 text-primary font-medium">
            Upload Files for Agent
          </router-link>
        </div>
        <!-- End of added links -->
        <div class="border-t border-gray-200">
          <form @submit.prevent="submitForm">
            <div class="px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6">
                  <label
                    for="agent_name"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Agent Name
                  </label>
                  <input
                    v-model="agent.name"
                    type="text"
                    name="agent_name"
                    id="agent_name"
                    class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="agent_description"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    v-model="agent.description"
                    id="agent_description"
                    name="agent_description"
                    rows="3"
                    class="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                <div class="col-span-6">
                  <label
                    for="agent_display_name"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Agent Display Name
                  </label>
                  <input
                    v-model="agent.agent_display_name"
                    type="text"
                    name="agent_display_name"
                    id="agent_display_name"
                    class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="company_name"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    v-model="agent.company_name"
                    type="text"
                    name="company_name"
                    id="company_name"
                    class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="primer_prompt"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Primer Prompt
                  </label>
                  <textarea
                    v-model="agent.primer_prompt"
                    id="primer_prompt"
                    name="                    primer_prompt"
                    rows="3"
                    class="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save
              </button>
              <button
                type="button"
                @click="deleteAgent"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axiosConfig.js';
// import { useRouter } from 'vue-router';

export default {
  name: 'ManageAgentComponent',
  data() {
    return {
      agent: {
        id: null,
        name: '',
        description: '',
        agent_display_name: '',
        company_name: '',
        primer_prompt: '',
      },
    };
  },
  computed: {
    agentNamespace() {
      return this.$route.params.agent_namespace;
    },
  },
  methods: {
    async submitForm() {
      try {
        const agentNamespace = this.$route.params.agent_namespace;

        if (agentNamespace) {
          // Update agent
          const { data } = await axios.put(
            `/agent/${agentNamespace}/`,
            this.agent
          );
          this.$router.push({ name: 'dashboard' });
          console.log("DATA:")
          console.log(data)
        } else {
          // Create agent
          const { data } = await axios.post('/agent/create/', this.agent);
          this.$router.push({ name: 'dashboard' });
          console.log("DATA:")
          console.log(data)
        }
      } catch (error) {
        console.error('Failed to save agent:', error);
      }
    },
    async deleteAgent() {
      try {
        const agentNamespace = this.$route.params.agent_namespace;
        if (agentNamespace) {
          await axios.delete(`/agent/${agentNamespace}/`);
          this.$router.push({ name: 'dashboard' });
        }
      } catch (error) {
        console.error('Failed to delete agent:', error);
      }
    },
    async goToChat() {
      this.$router.push({ name: 'chat', params: { agent_namespace: this.$route.params.agent_namespace } });
    },
    async goToUpload() {
      this.$router.push({ name: 'upload', params: { agent_namespace: this.$route.params.agent_namespace } });
    },
  },
  async created() {
    const agentNamespace = this.$route.params.agent_namespace;
    if (agentNamespace) {
      try {
        const { data } = await axios.get(`/agent/${agentNamespace}/`);
        this.agent = data;
      } catch (error) {
        console.error('Failed to fetch agent data:', error);
      }
    }
  },
};
</script>

<style scoped>
.text-primary {
  color: #3f51b5;
}
.bg-primary {
  background-color: #3f51b5;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #3f51b5;
}
.focus\:border-primary:focus {
  border-color: #3f51b5;
}
</style>
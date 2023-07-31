<template>
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto px-4 py-6">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-primary">
              Manage API Keys
            </h3>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div class="col-span-3">
                  <ul class="list-none">
                    <li v-for="key in apiKeys" :key="key.id">
                      {{ key.key }}
                      <button
                        @click="deleteKey(key.key)"
                        class="ml-3 text-sm text-red-500"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                  <button
                    @click="createKey"
                    class="text-primary mt-2"
                  >
                    Create New API Key
                  </button>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ManageKeysComponent',
    data() {
      return {
        apiKeys: [],
      };
    },
    methods: {
      async createKey() {
        try {
          const { data } = await axios.post('/manage_keys/create_key/');
          this.apiKeys.push({ key: data.key });
        } catch (error) {
          console.error('Failed to create API key:', error);
        }
      },
      async deleteKey(key) {
        try {
          await axios.post(`/manage_keys/${key}/delete/`);
          this.apiKeys = this.apiKeys.filter((apiKey) => apiKey.key !== key);
        } catch (error) {
          console.error('Failed to delete API key:', error);
        }
      },
    },
    async created() {
      try {
        const { data } = await axios.get('/manage_keys/');
        this.apiKeys = data.api_keys || [];
      } catch (error) {
        console.error('Failed to fetch API keys:', error);
      }
    },
  };
  </script>  
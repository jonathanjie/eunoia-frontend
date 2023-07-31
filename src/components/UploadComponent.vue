<template>
    <div id="upload-wrapper" class="w-full h-full flex flex-col items-center justify-center">
      <div class="logo-container mb-6">
        <img
          src="https://cdn.discordapp.com/attachments/807707281961123883/1095056498058600519/logo_navy.png"
          alt="Logo"
          class="logo h-16"
        />
      </div>
      <div id="pinecone-details" class="w-full max-w-md">
        <form
          id="upload-form"
          @submit.prevent="submitForm"
          class="flex flex-col space-y-4"
        >
          <label for="file_type" class="font-bold">File type:</label>
          <select id="file_type" v-model="fileType" @change="updateInputFields" class="p-2 border border-gray-300 rounded">
            <option value="notion">Notion Export</option>
            <option value="csv">CSV</option>
            <option value="html_website">HTML-only Websites</option>
            <option value="pdf">PDF</option>
          </select>
          <div id="file-input-wrapper" class="flex flex-col space-y-2">
            <label for="file" class="font-bold">Upload your file:</label>
            <input type="file" id="file" ref="fileInput" class="p-2 border border-gray-300 rounded">
          </div>
          <input type="submit" value="Upload" class="p-2 bg-blue-600 text-white rounded cursor-pointer" />
          <div id="uploading-spinner" :class="{ spinner: true, hidden: !uploading }" class="h-6 w-6"></div>
        </form>
        <div id="message" class="message mt-4 text-red-600">{{ message }}</div>
      </div>
      <router-link :to="`/manage-agent/${agentNamespace}`" class="text-blue-600 mt-4">Back to Agent Management</router-link>
    </div>
  </template>

<script>
import axios from '@/axiosConfig.js';

export default {
  data() {
    return {
      fileType: "notion",
      uploading: false,
      message: "",
    };
  },
  computed: {
    agentNamespace() {
      return this.$route.params.agent_namespace;
    },
  },
  methods: {
    updateInputFields() {
      // Logic for updating input fields based on fileType (if needed)
    },
    async submitForm() {
      this.uploading = true;
      this.message = "";

      try {
        const formData = new FormData();
        formData.append("file_type", this.fileType);
        formData.append("file", this.$refs.fileInput.files[0]);

        const response = await axios.post(
          `/agent/${this.agentNamespace}/upload-page/upload/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          this.message = "Documents processed and uploaded.";
        } else {
          this.message = response.data.error || "An error occurred during upload.";
        }
      } catch (error) {
        this.message = error.message || "An error occurred during upload.";
      }

      this.uploading = false;
    },
  },
};
</script>
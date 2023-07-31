<template>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div class="max-w-md mx-auto">
            <div class="flex items-center space-x-5">
              <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 class="leading-relaxed">Manage Organization</h2>
              </div>
            </div>
            <div class="divide-y divide-gray-200">
              <form @submit.prevent="manageOrganization">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div class="flex flex-col">
                    <label class="leading-loose">Organization Name</label>
                    <input
                      type="text"
                      v-model="organizationName"
                      class="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 rounded-md focus:outline-none text-sm transition duration-150 ease-in-out"
                      placeholder="Organization Name"
                      required
                    />
                  </div>
                </div>
                <div class="pt-4 flex items-center space-x-4">
                  <button
                    type="submit"
                    class="flex justify-center items-center w-full px-4 py-3 rounded-md shadow text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        organizationName: "",
      };
    },
    methods: {
      async manageOrganization() {
        const response = await fetch("/manage-organization/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": this.$cookies.get("csrftoken"),
          },
          body: JSON.stringify({
            organization_name: this.organizationName,
          }),
        });
  
        if (response.ok) {
          this.$router.push("/dashboard");
        } else {
          console.error("Error saving organization");
        }
      },
    },
  };
  </script>
  
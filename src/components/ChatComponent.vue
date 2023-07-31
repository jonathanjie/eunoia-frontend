<template>
    <div class="container mx-auto px-4 py-6">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-primary">
            Chat with {{ agent.name }}
          </h3>
        </div>
        <div class="border-t border-gray-200">
          <div class="p-4">
            <div class="messages">
              <div v-for="message in messages" :key="message.id">
                <div v-if="message.sender === 'user'" class="text-right">
                  <div class="text-green-500 font-semibold">User</div>
                  {{ message.content }}
                </div>
                <div v-else>
                  <div class="text-blue-500 font-semibold">Agent</div>
                  {{ message.content }}
                </div>
              </div>
            </div>
            <form @submit.prevent="sendMessage">
              <input
                type="text"
                v-model="userMessage"
                placeholder="Type your message"
                class="border w-full p-2 my-4"
              />
              <button type="submit" class="bg-primary text-white px-4 py-2">
                Send
              </button>
            </form>
            <button @click="resetConversation" class="bg-red-500 text-white px-4 py-2">
              Reset Conversation
            </button>
          </div>
        </div>
      </div>
      <router-link :to="`/manage-agent/${agentNamespace}`">Back to Agent Management</router-link>
    </div>
  </template>
  
<script>
import axios from '@/axiosConfig.js';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'ChatComponent',
  props: {
    agentNamespace: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      agent: {},
      userMessage: '',
      messages: [],
      sessionId: uuidv4(),
    };
  },
  methods: {
    async fetchAgent() {
      try {
        const { data } = await axios.get(`/agent/${this.agentNamespace}/`);
        this.agent = data.agent;
      } catch (error) {
        console.error('Failed to fetch agent:', error);
      }
    },
    async getConversationHistory() {
      try {
        const { data } = await axios.get(
          `/agent/${this.agentNamespace}/chat/${this.sessionId}/get_conversation_history/`,
        );
        this.messages = data.conversation_history || [];
      } catch (error) {
        console.error('Failed to fetch conversation history:', error);
      }
    },
    async sendMessage() {
      if (this.userMessage.trim() === '') return;
      const message = {
        sender: 'user',
        content: this.userMessage.trim(),
      };
      this.messages.push(message);
      this.userMessage = '';
      try {
        const { data } = await axios.post(
          `/agent/${this.agentNamespace}/chat/send-message/`,
          {
            user_input: message.content,
            session_id: this.sessionId,
          },
        );
        if (data.response) {
          this.messages.push({
            sender: 'agent',
            content: data.response,
          });
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    },
    resetConversation() {
      this.sessionId = uuidv4();
      this.getConversationHistory();
    },
  },
  async created() {
    await this.fetchAgent();
    await this.getConversationHistory();
  },
};
</script>
  
  <style scoped>
  .messages {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .messages > div {
    margin-bottom: 1rem;
  }
  </style>
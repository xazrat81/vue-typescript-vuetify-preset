import Vue from 'vue'
import { ApiService } from 'pulsar-api-service/types/pulsar-api-service/index.d'

declare module 'vue/types/vue' {
  interface Vue {
    $apiService: ApiService
  }
}
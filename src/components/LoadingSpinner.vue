<template>
  <div class="spinner-container h-[92vh]">
    <svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Optional */
}

.spinner {
  animation: rotate 1s linear infinite;
  width: 50px; /* Adjust size as needed */
  height: 50px;
}

.path {
  stroke: #3498db; /* Adjust color as needed */
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -125;
  }
}
</style>

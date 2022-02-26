<template>
  <div class="g-loading">
    <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        :stroke="outsideColor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        ></animateTransform>
        <animate
          attributeName="stroke"
          :values="outsideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        :stroke="insideColor"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25;0 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        ></animateTransform>
        <animate
          attributeName="stroke"
          :values="insideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
    <div class="g-loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'GLoading',
  props: {
    width: {
      type: [Number, String],
      default: 50
    },
    height: {
      type: [Number, String],
      default: 50
    },
    outsideColor: {
      type: String,
      default: '#3be6cb'
    },
    insideColor: {
      type: String,
      default: '#02bcfe'
    },
    duration: {
      type: [Number, String],
      default: 2
    }
  },
  setup(ctx) {
    const { outsideColor, insideColor } = ctx;
    const outsideColorAnimation = computed(() => 
      `${outsideColor};${insideColor};${outsideColor}`);
    const insideColorAnimation = computed(() => 
      `${insideColor};${outsideColor};${insideColor}`);
    return {
      outsideColorAnimation,
      insideColorAnimation
    }
  }
};
</script>

<style lang="scss" scoped>
.g-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

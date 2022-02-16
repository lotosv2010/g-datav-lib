<template>
   <svg :style="{...style}" class="icon">
    <use :href="iconName"></use>
  </svg>
</template>

<script>

export default {
  name: 'GIcon',
  props: {
    name: String,
    prefix: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line
    style: Object,
  },
  setup(ctx) {
    const iconName = `#${ctx.prefix}${ctx.name}`;
    return {
      iconName,
    };
  },
};
</script>
<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
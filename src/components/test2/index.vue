<template>
  <div class="test">
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'TestComponent2',
  setup() {
    return {
      message: 'test 2!'
    };
  },
};
</script>

<style lang="scss" scoped>
.test{
  color: palegreen;
}
</style>

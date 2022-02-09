<template>
  <div class="test">
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'TestComponent3',
  setup() {
    return {
      message: 'test 3!'
    };
  },
};
</script>

<style lang="scss" scoped>
.test{
  color: hotpink;
}
</style>

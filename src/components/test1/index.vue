<template>
  <div class="test">
    <p>{{message}}</p>
    <p>{{doubleCount}}</p>
    <button @click="add">add->{{count}}</button>
  </div>
</template>

<script>
import { ref, computed} from 'vue';
export default {
  name: 'TestComponent1',
  setup() {
    const count = ref(1);
    const doubleCount = computed(() => count.value * 2);
    const add = () => count.value++;
    return {
      message: 'hello component!',
      count,
      doubleCount,
      add
    };
  },
};
</script>

<style lang="scss" scoped>
.test{
  color: red;
}
</style>

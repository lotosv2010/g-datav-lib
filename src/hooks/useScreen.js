import { ref, onMounted, nextTick } from 'vue';

export default function useScreen(id) {
  const width = ref(0);
  const height = ref(0);
  let dom;
  onMounted(() => {
    dom = document.querySelector(`#${id}`);
    const { clientWidth, clientHeight } = dom;
    width.value = clientWidth;
    height.value = clientHeight;
  });
  return {
    width,
    height
  }
}
<script>
  export default {
    name: 'App',
  }
</script>

<script setup>
import { ref } from 'vue';
import config from './config';
import ListBox from '@/components/ListBox/ListBox.vue';


const leftSideItems = ref()
const rightSideItems = ref()

</script>

<template>
  <div :class="$bem()">
    <section :class="$bem('left')">
      <div :class="$bem('left-selected')">
        <div :class="$bem('item')" v-for="item of leftSideItems" :key="item.id">
          {{ item.name }}
        </div>
        <div>
          {{ leftSideItems?.length ?? 0 }} / {{config.maxSelectedItemsLeftSide}}
        </div>
      </div>
      <ListBox :items="config.leftSideItems" :itemLabel="'name'" v-model="leftSideItems" multiple :maxSelectedItems="config.maxSelectedItemsLeftSide"/>
    </section>
    <section :class="$bem('right')">
      <div :class="$bem('right-selected')">
        <div :class="$bem('item')" v-for="item of rightSideItems" :key="item.id">
          {{ item.name }}
        </div>
      </div>
      <ListBox :items="config.rightSideItems" :itemLabel="'name'" v-model="rightSideItems"/>
    </section>
  </div>
</template>

<style>
.App {
  display:  flex;
  justify-content: space-between;
  section {
    flex-grow: 1;
  }
}
</style>

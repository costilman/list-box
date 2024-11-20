<script>
  export default {
    name: 'ListBox',
  }
</script>

<script setup>
const props = defineProps({
  items: Array,
  itemLabel: String,
  multiple: Boolean,
  maxSelectedItems: Number,
})
const getItemLabel = (item) => {
  return item[props.itemLabel]
}
const getItemId = (item) => {
  return item?.id ?? getItemLabel(item)
} 

const isEqual = (item_1, item_2) => {
  return getItemId(item_1) === getItemId(item_2)
}

const isSelected = (item) => {
  return modelValue.value?.some((arrItem) => isEqual(arrItem, item))
}

const maxValidate = (_new) => {
  if (props.maxSelectedItems && _new.length > props.maxSelectedItems) {
    emit('onError', {
      message: 'maxSelectedItemsLimitExceeded',
      type: 'LimitExceeded',
    })
    return modelValue.value
  } else {
    return _new
  }
}

const emit = defineEmits(['onItemClick', 'onError'])

const modelValue = defineModel({
  default: [],
  set (value) {
    const filtred = modelValue.value?.filter(arrItem => !isEqual(arrItem, value))
    if (isSelected(value)) {
      return filtred
    } else {
      return props.multiple ? maxValidate([...modelValue.value, value]) : [value] 
    }
  },
})

const onItemClick = (item) => {
  emit('onItemClick', item)
  modelValue.value = item
}

</script>

<template>
  <div :class="$bem()">
    <ul :class="$bem('container')">
      <li v-for="item of items" :key="getItemId(item)" @click="onItemClick(item)" :class="$bem('item', {selected: isSelected(item)})">
        <slot name="item" :item="item">
          {{ getItemLabel(item) }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<style>
.ListBox-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ListBox-item {
  padding: 4px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid;
  cursor: pointer;
}
.ListBox-item--selected {
  color: red;
}
</style>

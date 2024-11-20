import { getCurrentInstance } from 'vue'

const blockWithModifiers = (block, modifiers = []) => {
  return modifiers.map(modifier => `${block}--${modifier}`)
}

const bem = (block = '', modifiers = {}, isRoot = false) => {
  modifiers = Object.entries(modifiers).map(modifier => {
    if (modifier[1]) return modifier[0]
  }).filter(Boolean)
  const componentName = getCurrentInstance()?.type?.name
  const blockName = block ? `${componentName}-${block}` : componentName 
  const classes = [blockName, ...blockWithModifiers(blockName, modifiers)]
  if (isRoot) {
    classes.unshift([componentName, ...blockWithModifiers(componentName, modifiers)])
  }
  return classes.join(' ')
}

export default {
  install: (app) => {
    app.config.globalProperties.$bem = bem
  }
}
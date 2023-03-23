<template>
  <div class="qk-text">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'QkText',
  props: {
    value: {
      type: [String, Number],
      default: () => null
    },
    options: {
      type: Array,
      default: () => null
    }
  },
  data() {
    return {
      text: ''
    }
  },
  watch: {
    value: {
      handler: function() {
        this.text = this.getText()
      },
      immediate: true
    },
    options: {
      handler: function() {
        this.text = this.getText()
      }
    }
  },
  methods: {
    getText() {
      const value = this.value
      let label = ''
      if (this.options) {
        const find = this.options.find(item => item.value === value)
        label = find ? find.label : '--'
        return label
      }
      return value || '--'
    }
  }
}
</script>

<style>

</style>

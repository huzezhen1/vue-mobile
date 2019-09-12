<template>
  <div :style="{fontSize: size, color:color}" class="svg-icon-box">
    <svg class="svg-icon"
        :class="className"
        aria-hidden="true"
        v-on="$listeners"
        >
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    }
  },
  computed: {
    iconName () {
      if (this.icon.startsWith('icon')) {
        return `#${this.icon}`
      } else {
        return `#icon-${this.icon}`
      }
    },
    className () {
      if (this.icon.startsWith('icon')) {
        return `svg-${this.icon}`
      } else {
        return `svg-icon-${this.icon}`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon-box {
  display: inline-block;
  line-height: 1px;
  font-size: 1em;
}
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
}
</style>

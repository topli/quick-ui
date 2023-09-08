<template>
  <div class="qk-date" :class="['qk-date__' + type]">
    <input class="el-input__inner" readonly v-model="inputValue" ref="inputRef" @click="showPicker">
    <i class="el-icon el-icon-circle-close" v-if="!!inputValue" @click="inputClear"></i>
    <el-date-picker
      ref="dateRef"
      v-bind="$props"
      class="qk-date-component"
      v-model="dateValue"
      :type="type"
      @change="dateChange"
      @blur="dateBlur">
    </el-date-picker>
    <el-time-picker
      ref="timeRef"
      v-bind="$props"
      :is-range="isTimerange"
      class="qk-time-component"
      v-model="timeValue"
      @change="dateChange"
      @blur="dateBlur">
    </el-time-picker>
  </div>
</template>

<script>
import { merge } from 'loadsh'
import { dateFormat } from '@/utils'
import Picker from 'element-ui/packages/date-picker/src/picker.vue'
console.log(Picker);
export default {
  name: 'QkDate',
  props: merge(Picker.props,
    {
      type: { type: String, default: 'Date' }
    }
  ),
  data() {
    return {
      inputValue: null,
      dateValue: null,
      timeValue: null,
      inputRef: null,
      dateRef: null,
      timeRef: null,
      visible: false,
      formatType: {
        year: 'yyyy',
        month: 'yyyy-MM',
        time: 'HH:mm:ss',
        timerange: 'HH:mm:ss',
        date: 'yyyy-MM-dd',
        daterange: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        datetimerange: 'yyyy-MM-dd HH:mm:ss',
        monthrange: 'yyyy-MM'
      }
    }
  },
  watch: {
    value: function () {
      this.initValue()
    }
  },
  computed: {
    isTime() {
      if (this.type === 'time' || this.type === 'timerange') {
        return true
      }
      return false
    },
    isTimerange() {
      return this.type === 'timerange'
    },
    _value() {
      return this.isTime ? this.timeValue : this.dateValue
    }
  },
  mounted() {
    this.inputRef = this.$refs.inputRef
    this.dateRef = this.$refs.dateRef
    this.timeRef = this.$refs.timeRef
    this.initValue()
  },
  methods: {
    initValue() {
      if (this.isTime) {
        this.timeValue = this.value
      } else {
        this.dateValue = this.value
      }
      const getValue = this.isTime ? this.getTimeString : this.getDateString
      this.inputValue = getValue()
    },
    showPicker() {
      this.$emit('focus')
      if (!this.isTime) {
        this.dateRef.showPicker()
        this.visible = this.dateRef.pickerVisible
      } else {
        this.timeRef.showPicker()
        this.visible = this.dateRef.pickerVisible
      }
    },
    getDateString() {
      if (!this.dateValue) return null
      const format = this.formatType[this.type]
      if (this.type.indexOf('range') !== -1) {
        if (!this.dateValue[0]) return null
        const [start, end] = this.dateValue
        return dateFormat(start, format) + ' - ' + dateFormat(end, format)
      } else {
        return dateFormat(this.dateValue, format)
      }
    },
    getTimeString() {
      if (!this.timeValue) return null
      const format = this.formatType[this.type]
      if (this.type.indexOf('range') !== -1) {
        if (!this.timeValue[0]) return null
        const [start, end] = this.timeValue
        return dateFormat(start, format) + ' - ' + dateFormat(end, format)
      } else {
        return dateFormat(this.timeValue, format)
      }
    },
    inputClear() {
      this.dateValue = null
      this.timeValue = null
      this.inputValue = null
      this.$emit('input', this._value)
      this.$emit('change', this._value)
      this.$emit('blur')
    },
    dateChange() {
      const getValue = this.isTime ? this.getTimeString : this.getDateString
      this.inputValue = getValue()
      this.$emit('input', this._value)
      this.$emit('change', this._value)
    },
    dateBlur() {
      this.visible = false
      this.$emit('blur')
    }
  }
}
</script>
<style scoped lang='scss'>
.qk-date {
  position: relative;
  .el-input__inner {
    padding-right: 30px;
    width: 220px;
  }
  .el-icon {
    cursor: pointer;
    display: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #C0C4CC;
  }
  &:hover {
    .el-icon {
      display: block;
    }
  }
  .qk-date-component, .qk-time-component {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  &.qk-date__datetimerange {
    .el-input__inner {
      width: calc(220px * 2 + 10px);
    }
  }
}

</style>
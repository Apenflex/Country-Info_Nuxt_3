<script setup>
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'text'
    },
    maxLength: {
        type: Number
    },
    name: {
        type: String,
        default: '',
        required: true
    },
    placeholder: {
        type: String,
        default: ' '
    },
    required: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: null
    },
    label: {
        type: String,
        default: ''
    },
    maska: {
		type: String,
		default: ''
	},
})
const modelValue = defineModel('value', {
    type: String,
    default: ''
})

const emit = defineEmits(['focus', 'change', 'input', 'click', 'keydown', 'keypress', 'blur', 'paste'])

const focused = ref(false)
const onFocus = e => {
    focused.value = true
    emit('focus', e)
}
const onBlur = e => {
    focused.value = false
    emit('blur', e)
}
</script>
<template>
    <div
        :class="[
            'basic-input relative',
            { focused, error }
        ]"
    >
        <label
            v-if="label"
            :for="`input-${name}`"
            class="basic-input__label font-light"
        >
            {{ label }}<span>{{ required ? '*' : '' }}</span>
        </label>
        <div class="basic-input__wrapper flex relative">
            <!-- v-maska
                :data-maska="maska" -->
            <input
                :id="`input-${name}`"
                v-model="modelValue"
                
                :maxlength="maxLength"
                :type="type"
                :name="name"
                :placeholder="placeholder"
                :required="required"
                :disabled="disabled"
                @focus="onFocus"
                @change="$emit('change', $event)"
                @input="onInput"
                @keydown="$emit('keydown', $event)"
                @keypress="$emit('keypress', $event)"
                @blur="onBlur"
                @paste="$emit('paste', $event)"
                @click="$emit('click')"
            />
            <span
                v-if="$slots.icon"
                :class="['basic-input__icon cursor-pointer']"
                @click="$emit('iconClick')"
            >
                <slot name="icon" />
            </span>
        </div>
        <p v-if="error" class="basic-input__error">
            {{ error }}
        </p>
    </div>
</template>

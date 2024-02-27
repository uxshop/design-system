<script setup lang="ts">
import { keymap, ViewUpdate } from '@codemirror/view'
import { EditorView, basicSetup } from '@codemirror/basic-setup'
import { EditorState, Compartment, Text } from '@codemirror/state'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { javascript } from '@codemirror/lang-javascript'
import { htmlLanguage, html } from '@codemirror/lang-html'
import { language } from '@codemirror/language'
import { css } from '@codemirror/lang-css'
import { history, historyKeymap } from '@codemirror/history'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { getCurrentInstance, onMounted, ref, shallowRef, watchEffect } from 'vue'

// const isMac = /Mac/.test(navigator.platform)
const languageConf = new Compartment()
const autoLanguage = EditorState.transactionExtender.of((tr) => {
	if (!tr.docChanged) return null
	let docIsHTML = /^\s*</.test(tr.newDoc.sliceString(0, 100))
	let stateIsHTML = tr.startState.facet(language) == htmlLanguage
	if (docIsHTML == stateIsHTML) return null
	return {
		effects: languageConf.reconfigure(docIsHTML ? html() : javascript())
	}
})

const props = defineProps<{
	modelValue?: string
	config?: object
}>()

const emit = defineEmits(['update:modelValue'])
const editorRef = ref()
const cm = shallowRef()
const noUpdate = shallowRef()
const uid = `ui-codemirror-${getCurrentInstance()?.uid}`

onMounted(() => {
	const el = document.querySelector(`#${uid}`) as Element
	const updateListenerExtension = EditorView.updateListener.of((update: ViewUpdate) => {
		if (update.docChanged && !noUpdate.value) {
			const doc = update.state.doc as Text
			const docFinal = Array(doc)
			const value = docFinal.join('\n')
			emit('update:modelValue', value)
		}

		noUpdate.value = false
	})

	if (el) {
		cm.value = new EditorView({
			parent: el,
			state: EditorState.create({
				doc: props.modelValue,
				extensions: [
					// myTheme,
					updateListenerExtension,
					history(),
					defaultHighlightStyle,
					basicSetup,
					languageConf.of(css()),
					autoLanguage,
					keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab])
				]
			})
		})
	}
})
</script>

<template>
	<div :id="uid" ref="editorRef" class="ui-codemirror"></div>
</template>

<style>
@import './Codemirror.scss';
</style>

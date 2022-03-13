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
import { onMounted, ref, shallowRef, watchEffect } from 'vue'

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
	value?: string
	config?: object
}>()

const emit = defineEmits(['update'])
const editorRef = ref()
const cm = shallowRef()
const noUpdate = shallowRef()

onMounted(() => {
	const el = document.querySelector('#editor') as Element
	const updateListenerExtension = EditorView.updateListener.of((update: ViewUpdate) => {
		if (update.docChanged && !noUpdate.value) {
			stopWatch()
			const doc = update.state.doc as Text
			const docFinal = Array(doc)
			const value = docFinal.join('\n')
			emit('update', value)
		}

		noUpdate.value = false
	})

	if (el) {
		cm.value = new EditorView({
			parent: el,
			state: EditorState.create({
				doc: props.value,
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

	const stopWatch = watchEffect(() => {
		const update = cm.value.state.update({
			changes: { from: 0, to: cm.value.state.doc.length, insert: props.value }
		})
		noUpdate.value = true
		cm.value.update([update])
	})
})
</script>

<template>
	<div id="editor" ref="editorRef" class="ui-codemirror"></div>
</template>

<style>
@import './Codemirror.scss';
</style>

<script setup lang="ts">
import { keymap } from '@codemirror/view'
import { EditorView, basicSetup } from '@codemirror/basic-setup'
import { EditorState, Compartment } from '@codemirror/state'
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
	value: string
	config: object
}>()

const emit = defineEmits(['update'])

const editorRef = ref()

const cm = shallowRef()

const noUpdate = shallowRef()

onMounted(() => {
	const updateListenerExtension = EditorView.updateListener.of((update: any) => {
		if (update.docChanged && !noUpdate.value) {
			stopWatch()
			const value = update.state.doc.text.join('\n')
			emit('update', value)
		}

		noUpdate.value = false
	})

	cm.value = new EditorView({
		parent: document.querySelector('#editor'),
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

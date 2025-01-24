<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import BoldIcon from "vue-material-design-icons/FormatBold.vue";
import ItalicIcon from "vue-material-design-icons/FormatItalic.vue";
import UnderlineIcon from "vue-material-design-icons/FormatUnderline.vue";
import H1Icon from "vue-material-design-icons/FormatHeader1.vue";
import H2Icon from "vue-material-design-icons/FormatHeader2.vue";
import ListIcon from "vue-material-design-icons/FormatListBulleted.vue";
import OrderedListIcon from "vue-material-design-icons/FormatListNumbered.vue";
import BlockquoteIcon from "vue-material-design-icons/FormatQuoteClose.vue";
import CodeIcon from "vue-material-design-icons/CodeTags.vue";
import HorizontalRuleIcon from "vue-material-design-icons/Minus.vue";
import UndoIcon from "vue-material-design-icons/Undo.vue";
import RedoIcon from "vue-material-design-icons/Redo.vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        " border border-sky-950 rounded-lg w-[90%] p-4 mx-auto min-h-[12rem] max-h-[12rem] overflow-y-auto prose max-w-none outline-none",
    },
  },
  content: props.modelValue,
  extensions: [StarterKit, Underline],
  onUpdate({ editor }) {
    emit("update:modelValue", editor.getHTML());
  },
});
</script>

<template>
  <div class="container mx-auto max-w-4xl my-8">
    <section
      v-if="editor"
      class="buttons border-b-0 flex items-center rounded-lg flex-wrap gap-x-4 border w-[90%] mx-auto border-sky-950 p-4"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'bg-pink-200 rounded': editor.isActive('bold') }"
        class="p-1"
      >
        <BoldIcon title="Bold" />
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'bg-pink-200 rounded': editor.isActive('italic') }"
        class="p-1"
      >
        <ItalicIcon title="Italic" />
      </button>
      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        :class="{ 'bg-pink-200 rounded': editor.isActive('underline') }"
        class="p-1"
      >
        <UnderlineIcon title="Underline" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{
          'bg-pink-200': editor.isActive('heading', { level: 1 }),
        }"
        class="p-1"
      >
        <H1Icon title="H1" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{
          'bg-pink-200': editor.isActive('heading', { level: 2 }),
        }"
        class="p-1"
      >
        <H2Icon title="H2" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-pink-200': editor.isActive('bulletList') }"
        class="p-1"
      >
        <ListIcon title="Bullet List" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'bg-pink-200': editor.isActive('orderedList') }"
        class="p-1"
      >
        <OrderedListIcon title="Ordered List" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'bg-pink-200': editor.isActive('blockquote') }"
        class="p-1"
      >
        <BlockquoteIcon title="Blockquote" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleCode().run()"
        :class="{ 'bg-pink-200': editor.isActive('code') }"
        class="p-1"
      >
        <CodeIcon title="Code" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setHorizontalRule().run()"
        class="p-1"
      >
        <HorizontalRuleIcon title="Horizontal Rule" />
      </button>
      <button
        type="button"
        class="p-1 disabled:text-gray-400"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <UndoIcon title="Undo" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        class="p-1 disabled:text-gray-400"
      >
        <RedoIcon title="Redo" />
      </button>
    </section>
    <EditorContent :editor="editor" />
  </div>
</template>

import { render, createVNode } from "vue"
import ToastComponent from "./Toast.vue"

let globalConfig = {
  className: "",
  horizontalPosition: "center",
  verticalPosition: "bottom",
  transition: "slide-down",
  duration: 3000,
  message: "",
  closeable: false,
}

let seed = 1

class Toast {
  constructor(options) {
    globalConfig = Object.assign({}, globalConfig, options)
  }
  open(text, config = {}) {
    let toastWrapper = null
    let toastVM = null
    const id = "ui-toast-" + seed++
    toastWrapper = document.createElement("div")
    toastWrapper.id = id
    toastVM = createVNode(
      ToastComponent,
      {
        ...globalConfig,
        ...config,
        message: text,
        id
      },
      null
    )
    render(toastVM, toastWrapper)
    document.body.appendChild(toastWrapper)
  }
  success(text) {
    this.open(text, { type: 'success' })
  }
  danger(text) {
    this.open(text, { type: 'danger' })
  }
}

export default new Toast()

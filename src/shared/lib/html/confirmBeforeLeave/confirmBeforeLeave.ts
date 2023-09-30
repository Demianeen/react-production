export const confirmBeforeLeave = (
  func: (event: BeforeUnloadEvent) => boolean = () => true,
) => {
  window.onbeforeunload = func
}

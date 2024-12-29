interface Copy {
  isCopied: Ref<boolean>
  copy: (text: string) => Promise<void>
}

export function useCopy(): Copy {
  const isCopied = ref(false);

  async function copy(text: string): Promise<void> {
    await navigator.clipboard.writeText(text);

    isCopied.value = true;

    setTimeout(() => {
      isCopied.value = false;
    }, 1000);

    window.plausible('color:copied');
  }

  return {
    isCopied,
    copy
  };
}

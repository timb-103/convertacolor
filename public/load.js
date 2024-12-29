(function () {
  const hex =
    "#" +
    (new URLSearchParams(window.location.search).get("hex") ??
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0"));
  document.write("<style>body { background-color: " + hex + "; }</style>");
  document.write('<meta name="bg-color" content="' + hex + '">');
})();

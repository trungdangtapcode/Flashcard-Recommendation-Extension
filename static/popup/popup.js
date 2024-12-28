const article = document.querySelector('#abstract')
console.log(article.textContent)
document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    alert(selectedText)
});
setInterval(() => {
    const selectedText = window.getSelection().toString().trim();
    console.log("Highlighted Text:", selectedText);
}, 1000);
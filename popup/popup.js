const article = document.querySelector('#abstract')
console.log(article.textContent)
document.addEventListener('mouseup', () => {
    
});
setInterval(() => {
    const selectedText = window.getSelection().toString().trim();
    console.log("Highlighted Text:", selectedText);
}, 1000);
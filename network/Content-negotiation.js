xhr = new XMLHttpRequest()
xhr.open('get', 'https://eloquentjavascript.net/author')

xhr.setRequestHeader('accept', 'text/string')

xhr.send()

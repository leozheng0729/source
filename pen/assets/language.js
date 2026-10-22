document.querySelectorAll('select[data-language]').forEach(select=>{select.addEventListener('change',()=>{window.location.assign(select.value);});});

var md = window.markdownit({
	html: true,
	highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
});


$('markdown').each(function(i, e) {
  var result = md.render($(e).html());
  $(e).html(result);
})


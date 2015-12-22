hljs.configure({tabReplace: '    '})
hljs.initHighlightingOnLoad();

/* Scroll to anchors */
$(".sidebar a").click(function(e) {
	e.preventDefault();

	var target = ($(($(this).attr("href"))).offset().top),
		targetName = $(this).attr("href");

	$('html, body').stop().animate({ scrollTop: target }, 500);
	history.pushState(null, null, targetName);
});

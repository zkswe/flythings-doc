(function () {
  var $root = document.getElementsByClassName('root')[0];
  if (window.hasEvent('touchstart')) {
    $root.dataset.isTouch = true;
    document.addEventListener('touchstart', function(){}, false);
  }

  var SOURCES = window.TEXT_VARIABLES.sources;
  window.Lazyload.js(SOURCES.jquery, function() {

    if ("developer.flythings.cn" == document.domain) {
      $("#hostcompany").show();
      alert("show footer");
      try {
        $("nav").find("ul").append('<li><a href="http://www.zkswe.com">关于我们</a></li>')
      } catch (e) { 
      }
    }
  });

})();
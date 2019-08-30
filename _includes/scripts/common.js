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
      try {
        $("nav").find("ul").append('<li><a href="http://www.zkswe.com">关于我们</a></li>')
      } catch (e) { 
      }
    }

    link_ide = $("#ide-download");
    if (link_ide != null) {
      if ("developer.flythings.cn" == document.domain) {
        link_ide.attr("href", "http://download.zkswe.com/ide/flythings-ide-win32-win32-x86-zkswe-setup.exe");
      } else if ("docs.flythings.cn" == document.domain) {
        link_ide.attr("href", "http://download.zkswe.com/ide/flythings-ide-win32-win32-x86-community-setup.exe");
      }      
    }
  });

})();
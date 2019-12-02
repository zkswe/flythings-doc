require(["gitbook"], function(gitbook) {
    gitbook.events.bind("start", function(e, config) {
    });

    // Notify pageview
    gitbook.events.bind("page.change", function() {
      docSetupIdeDownloadUrl();
      docSetupCopyright();
      docSetupIndexPage();
    });
});

function docSetupIdeDownloadUrl() {
    link_ide = $("#ide-download");
    if (link_ide != null) {
      if ("developer.flythings.cn" == document.domain) {
        link_ide.attr("href", "http://download.zkswe.com/ide/flythings-ide-win32-win32-x86-zkswe-setup.exe");
      } else if ("docs.flythings.cn" == document.domain) {
        link_ide.attr("href", "http://download.zkswe.com/ide/flythings-ide-win32-win32-x86-community-setup.exe");
      } else {
      }     
    }
}
function docSetupCopyright() {
    spancopyright = $("span.copyright").first();
    if (spancopyright != null) {
      if ("developer.flythings.cn" == document.domain) {
        spancopyright.html('Copyright &copy 2019 <a target="_blank" href="http://www.zkswe.com" > <b>深圳市中科世为科技有限公司</b></a>');
      } else if ("docs.flythings.cn" == document.domain) {
      } else {
      }     
    }
}
function docSetupIndexPage() {
    customLink = $("a.custom-link").first();
    if (customLink != null) {
      customLink.attr("href", window.location.href.slice(0,window.location.href.length - window.location.pathname.length));
    }
}

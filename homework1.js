function getURLForProduction() {
    return location.hash.replace(/^#/, '');
}

function getURLForTesting() {
    // testing code
    return "users";
}

function updateHashWhenIncorrectUrlForProduction() {
// grab the first URL from nav
    var $this = $('nav > ul > li:first-child > a[href!="#"]');

    //update hash
    window.location.hash = $this.attr('href');
}

function updateHashWhenIncorrectUrlForTesting() {
    // testing code
}

function checkURL(getURL, updateHashWhenIncorrectUrl) {

    //get the url by removing the hash
    // Шов. Зависимость убрана благодаря инъекции зависимости в функцию.
    var url = getURL();

    container = $('#content');
    // Do this if url exists (for page refresh, etc...)
    if (url) {
        // remove all active class
        $('nav li.active').removeClass("active");
        // match the url and add the active class
        $('nav li:has(a[href="' + url + '"])').addClass("active");
        var title = ($('nav a[href="' + url + '"]').attr('title'));

        // change page title from global var
        document.title = (title || document.title);
        //console.log("page title: " + document.title);

        // parse url to jquery
        loadURL(url + location.search, container);
    } else {
        // Шов. Зависимость убрана благодаря инъекции зависимости в функцию.
        updateHashWhenIncorrectUrl();
    }

}

// для продакшн кода
checkURL(getURLForProduction, updateHashWhenIncorrectUrlForProduction);

// для тетсов
checkURL(getURLForTesting, updateHashWhenIncorrectUrlForTesting);
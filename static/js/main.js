requirejs.config({
    baseUrl: '../static/js',
    paths: {
        jqm: 'jquery.mobile'
    },
    shim: {
        jqm: { deps: [ 'jquery' ] }
    }
});


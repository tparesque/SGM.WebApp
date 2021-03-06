var pages = pages || {};
pages.georeferencia = pages.georeferencia || {};
pages.georeferencia.model = pages.georeferencia.model || {};
pages.georeferencia.services = pages.georeferencia.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.georeferencia.viewModel = function () {   
    var model = pages.georeferencia.model;
    var service = pages.georeferencia.services;
   
    ko.applyBindings(new function () {
        var self = this;       

        self.usuarioLogado = ko.observable(new pages.menu.model.vmUsuarioLogado(getDataToken()));     
      
        self.init = function () {  
            
        };        

        self.init();

    }, bindingBody);
}();
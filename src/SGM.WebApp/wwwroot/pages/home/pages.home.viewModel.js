var pages = pages || {};
pages.home = pages.home || {};
pages.home.model = pages.home.model || {};
pages.home.services = pages.home.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.home.viewModel = function () {   
    var model = pages.home.model;
    var service = pages.home.services;
   
    ko.applyBindings(new function () {
        var self = this;       

        self.usuarioLogado = ko.observable(new pages.menu.model.vmUsuarioLogado(getDataToken()));     
      
        self.init = function () {  
            
        };        

        self.init();

    }, bindingBody);
}();
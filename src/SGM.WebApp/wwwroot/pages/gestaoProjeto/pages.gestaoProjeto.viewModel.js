var pages = pages || {};
pages.gestaoProjeto = pages.gestaoProjeto || {};
pages.gestaoProjeto.model = pages.gestaoProjeto.model || {};
pages.gestaoProjeto.services = pages.gestaoProjeto.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.gestaoProjeto.viewModel = function () {   
    var model = pages.gestaoProjeto.model;
    var service = pages.gestaoProjeto.services;
   
    ko.applyBindings(new function () {
        var self = this;       

        self.usuarioLogado = ko.observable(new pages.menu.model.vmUsuarioLogado(getDataToken()));     
      
        self.init = function () {  
            
        };        

        self.init();

    }, bindingBody);
}();
var pages = pages || {};
pages.isencaoIPTU = pages.isencaoIPTU || {};
pages.isencaoIPTU.model = pages.isencaoIPTU.model || {};
pages.isencaoIPTU.services = pages.isencaoIPTU.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.isencaoIPTU.visualizarViewModel = function () {   
    var model = pages.isencaoIPTU.model;
    var service = pages.isencaoIPTU.services;
    var id = window.location.href.split("/").lastOrDefault();
   
    ko.applyBindings(new function () {
        var self = this;       
        
        self.solicitacao = ko.observable();  

        self.init = function () {           
            self.obterSolicitacaoId(id);              
        };  

        self.obterSolicitacaoId = function (solicitacaoId) { 
            pages.dataServices.bloquearTela();
            service.obterSolicitacaoId(solicitacaoId).then(function (result) {
                self.solicitacao(new model.vmSolicitacao(result.data));                
            }).catch(function (result) {
                console.log(result.data);                   
            }).finally(function () {
                pages.dataServices.desbloquearTela();
            });           
        };    

        self.voltar = function () {
            pages.dataServices.bloquearTela();
            window.location.href = "/isencaoIPTU/Index";
        };

        self.init();

    }, bindingBody);
}();
var pages = pages || {};
pages.concertoIluminacao = pages.concertoIluminacao || {};
pages.concertoIluminacao.model = pages.concertoIluminacao.model || {};
pages.concertoIluminacao.services = pages.concertoIluminacao.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.concertoIluminacao.visualizarViewModel = function () {   
    var model = pages.concertoIluminacao.model;
    var service = pages.concertoIluminacao.services;
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
            window.location.href = "/ConcertoIluminacao/Index";
        };

        self.init();

    }, bindingBody);
}();
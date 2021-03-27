var pages = pages || {};
pages.isencaoIPTU = pages.isencaoIPTU || {};
pages.isencaoIPTU.model = pages.isencaoIPTU.model || {};
pages.isencaoIPTU.services = pages.isencaoIPTU.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.isencaoIPTU.cadastroViewModel = function () {   
    var model = pages.isencaoIPTU.model;
    var service = pages.isencaoIPTU.services;
   
    ko.applyBindings(new function () {
        var self = this;       
        
        self.solicitacao = ko.observable(new model.vmSolicitacao());         
        self.bloqueiaSalvar = ko.observable(false);  

        self.init = function () {  
          
        };      


        self.validar = function () {
            var mensagens = [];

            if (isNullOrEmptyOrWriteSpace(self.solicitacao().matricula()))
                mensagens.push("<strong>Matrícula</strong> é obrigatória!");

            if (mensagens.any()) {
                bootbox.alert(mensagens.join("</br>"));
                return false;
            }
            return true;
        };

        self.salvar = function () {

            if (!self.validar()) { return; }

            var parametro = {                
                usuarioId: self.solicitacao().usuarioId(),                
                observacao: self.solicitacao().observacao(),
                matricula: self.solicitacao().matricula()
            };

            pages.dataServices.bloquearTela();
            service.salvar(parametro).then(function () {                
                bootbox.alert("Solicitação salva com sucesso!", function () {
                    self.voltar();
                }); 
            }).catch(function (result) {
                if (result.exibeMensagem)
                    bootbox.alert(result.data);

                self.bloqueiaSalvar(false);                
            }).finally(function () {
                pages.dataServices.desbloquearTela();
            });
        };

        self.voltar = function () {
            pages.dataServices.bloquearTela();
            window.location.href = "/IsencaoIPTU/Index";
        };

        self.init();

    }, bindingBody);
}();
var pages = pages || {};
pages.concertoIluminacao = pages.concertoIluminacao || {};
pages.concertoIluminacao.model = pages.concertoIluminacao.model || {};
pages.concertoIluminacao.services = pages.concertoIluminacao.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.concertoIluminacao.cadastroViewModel = function () {   
    var model = pages.concertoIluminacao.model;
    var service = pages.concertoIluminacao.services;
   
    ko.applyBindings(new function () {
        var self = this;       
        
        self.solicitacao = ko.observable(new model.vmSolicitacao());  
        self.estados = ko.observableArray([]);
        self.municipios = ko.observableArray([]);
        self.bloqueiaSalvar = ko.observable(false);  

        self.init = function () {           
            
            self.obterEstados();  
            self.solicitacao().estadoId.subscribe(function (estadoId) {
                if (!estadoId) return;

                self.obterMunicipiosPorEstadoId(estadoId);
            });           
        };       

        self.obterEstados = function () {
            pages.dataServices.bloquearTela();
            service.obterEstados().then(function (result) {
                result.data.forEach(function (item) {
                    self.estados.push(new model.vmEstado(item));
                });
            }).catch(function (result) {
                console.log(result.data);
            }).finally(function () {
                pages.dataServices.desbloquearTela();
            });
        };

        self.obterMunicipiosPorEstadoId = function (estadoId) {            
            self.municipios([]);
            pages.dataServices.bloquearTela();
            service.obterMunicipioPorEstadoId(estadoId).then(function (result) {
                result.data.forEach(function (item) {
                    self.municipios.push(new model.vmMunicipio(item));
                });                   
            }).catch(function (result) {
                console.log(result.data);                   
            }).finally(function () {
                pages.dataServices.desbloquearTela();
            });           
        };

        self.validar = function () {
            var mensagens = [];

            if (isNullOrEmptyOrWriteSpace(self.solicitacao().logradouro()))
                mensagens.push("<strong>Logradouro</strong> é obrigatório!");

            if (isNullOrEmpty(self.solicitacao().numero()))
                mensagens.push("<strong>Número</strong> é obrigatório!");

            if (isNullOrEmptyOrWriteSpace(self.solicitacao().cep()))
                mensagens.push("<strong>CEP</strong> é obrigatório!");

            if (isNullOrEmptyOrWriteSpace(self.solicitacao().bairro()))
                mensagens.push("<strong>Bairro</strong> é obrigatório!");

            if (isNullOrEmpty(self.solicitacao().estadoId()))
                mensagens.push("<strong>Estado</strong> é obrigatório!");

            if (isNullOrEmpty(self.solicitacao().municipioId()))
                mensagens.push("<strong>Município</strong> é obrigatório!");

            if (mensagens.any()) {
                bootbox.alert(mensagens.join("</br>"));
                return false;
            }
            return true;
        };

        self.salvar = function () {

            if (!self.validar()) { return; }

            var municipioSelecionado = self.municipios().firstOrDefault(x => x.municipioId() == self.solicitacao().municipioId());
            var estadoSelecionado = self.estados().firstOrDefault(x => x.estadoId() == self.solicitacao().estadoId());

            var parametro = {                                               
                Observacao: self.solicitacao().observacao(),               
                Logradouro: self.solicitacao().logradouro(),
                Numero: self.solicitacao().numero(),
                CEP: self.solicitacao().cep(),
                Bairro: self.solicitacao().bairro(),
                Complemento: self.solicitacao().complemento(),
                MunicipioId: self.solicitacao().municipioId(),
                MunicipioNome: municipioSelecionado.nome(),
                EstadoId: self.solicitacao().estadoId(),
                EstadoNome: estadoSelecionado.nome() 
            };

            console.log(parametro)
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
            window.location.href = "/ConcertoIluminacao/Index";
        };

        self.init();

    }, bindingBody);
}();
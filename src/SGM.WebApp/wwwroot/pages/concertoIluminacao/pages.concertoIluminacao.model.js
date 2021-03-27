var pages = pages || {};
pages.concertoIluminacao = pages.concertoIluminacao || {};
pages.concertoIluminacao.services = pages.concertoIluminacao.services || {};

pages.concertoIluminacao.model = function () {    
    
    var vmSolicitacao = function (solicitacao, perfil) {
        var self = this;

        self.solicitacaoId = ko.observable();
        self.usuarioId = ko.observable();
        self.usuarioNome = ko.observable();
        self.observacao = ko.observable();
        self.situacaoId = ko.observable();
        self.situacaoNome = ko.observable();
        self.dataCadastro = ko.observable();
        self.logradouro = ko.observable();
        self.numero = ko.observable();
        self.cep = ko.observable();
        self.bairro = ko.observable();
        self.complemento = ko.observable();
        self.municipioId = ko.observable();
        self.municipioNome = ko.observable();
        self.estadoId = ko.observable();
        self.estadoNome = ko.observable();
        self.historicoSolicitacoes = ko.observableArray([]);

        if (solicitacao) {
            self.solicitacaoId(solicitacao.solicitacaoId);
            self.usuarioId(solicitacao.usuarioId);
            self.usuarioNome(solicitacao.usuarioNome);
            self.observacao(solicitacao.observacao);
            self.situacaoId(solicitacao.situacaoId);
            self.situacaoNome(solicitacao.situacaoNome);
            self.dataCadastro(solicitacao.dataCadastro);            
            self.logradouro(solicitacao.logradouro);
            self.numero(solicitacao.numero);
            self.cep(solicitacao.cep);
            self.bairro(solicitacao.bairro);
            self.complemento(solicitacao.complemento);
            self.municipioId(solicitacao.municipioId);
            self.municipioNome(solicitacao.municipioNome);
            self.estadoId(solicitacao.estadoId);
            self.estadoNome(solicitacao.estadoNome);           

            solicitacao.historicoSolicitacoes.forEach(function (item) {
                self.historicoSolicitacoes.push(new vmHistoricoSolicitacao(item));
            });
        }

        self.exibeBotaoIniciarAtendimento = ko.computed(function () {
            if (self.situacaoNome() == 'Solicitação Efetuada' &&
                (
                    perfil === pages.concertoIluminacao.services.EPerfil.ADMINISTRADOR ||
                    perfil === pages.concertoIluminacao.services.EPerfil.FUNCIONARIO 
                ))
                return true;

            return false;
        });  

        self.exibeBotaoFinalizarAtendimento = ko.computed(function () {
            if (self.situacaoNome() == 'Em Andamento' &&
                (
                    perfil === pages.concertoIluminacao.services.EPerfil.ADMINISTRADOR ||
                    perfil === pages.concertoIluminacao.services.EPerfil.FUNCIONARIO
                ))
                return true;

            return false;
        });  

        self.exibeBotaoExcluir = ko.computed(function () {
            if (self.situacaoNome() != 'Cancelado' && self.situacaoNome() != 'Concluida' &&
                (
                    perfil === pages.concertoIluminacao.services.EPerfil.ADMINISTRADOR ||
                    perfil === pages.concertoIluminacao.services.EPerfil.GESTOR
                ))
                return true;

            return false;
        });  
    };  

    var vmHistoricoSolicitacao = function (historicoSolicitacao) {
        var self = this;

        self.historicoSolicitacaoId = ko.observable(historicoSolicitacao.historicoSolicitacaoId);
        self.usuarioAlteracaoId = ko.observable(historicoSolicitacao.usuarioAlteracaoId);
        self.usuarioAlteracaoNome = ko.observable(historicoSolicitacao.usuarioAlteracaoNome);
        self.situacaoId = ko.observable(historicoSolicitacao.situacaoId);
        self.situacaoNome = ko.observable(historicoSolicitacao.situacaoNome);
        self.dataAlteracao = ko.observable(historicoSolicitacao.dataAlteracao);
    };

    var vmEstado = function (estado) {
        var self = this;

        self.estadoId = ko.observable(estado.estadoId);
        self.nome = ko.observable(estado.nome);
        self.sigla = ko.observable(estado.sigla);
    };

    var vmMunicipio = function (municipio) {
        var self = this;

        self.municipioId = ko.observable(municipio.municipioId);
        self.nome = ko.observable(municipio.nome);
    }; 

    return {   
        vmSolicitacao,
        vmEstado,
        vmMunicipio
    };
}();
var pages = pages || {};
pages.isencaoIPTU = pages.isencaoIPTU || {};

pages.isencaoIPTU.model = function () {    

    var vmSolicitacao = function (solicitacao) {
        var self = this;

        self.solicitacaoId = ko.observable();
        self.usuarioId = ko.observable();
        self.usuarioNome = ko.observable();
        self.matricula = ko.observable();
        self.observacao = ko.observable();
        self.justificativaPrefeitura = ko.observable();
        self.situacao = ko.observable();
        self.situacaoNome = ko.observable();
        self.dataCadastro = ko.observable();        
        self.historicoSolicitacoes = ko.observableArray([]);

        if (solicitacao) {
            self.solicitacaoId(solicitacao.solicitacaoId);
            self.usuarioId(solicitacao.usuarioId);
            self.usuarioNome(solicitacao.usuarioNome);
            self.matricula(solicitacao.matricula);
            self.observacao(solicitacao.observacao);
            self.justificativaPrefeitura(solicitacao.justificativaPrefeitura);
            self.situacao(solicitacao.situacao);
            self.situacaoNome(solicitacao.situacaoNome);
            self.dataCadastro(solicitacao.dataCadastro);            

            solicitacao.historicoSolicitacoes.forEach(function (item) {
                self.historicoSolicitacoes.push(new vmHistoricoSolicitacao(item));
            });
        }
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

    return {   
        vmSolicitacao
    };
}();
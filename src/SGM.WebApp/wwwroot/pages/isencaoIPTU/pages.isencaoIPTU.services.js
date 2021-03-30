var pages = pages || {};
pages.isencaoIPTU = pages.isencaoIPTU || {};

pages.isencaoIPTU.services = function () {  

    var obterTodos = function () {
        var url = pages.metadata.actionUrl("/api/gateway/solicitacao/isencao-iptu");
        return pages.dataServices.get(url);
    }

    var salvar = function (parametro) {
        var url = pages.metadata.actionUrl("/api/gateway/solicitacao/isencao-iptu");
        return pages.dataServices.postAjax(url, parametro);
    }  

    var obterSolicitacaoId = function (solicitacaoId) {
        var url = pages.metadata.actionUrl("/api/gateway/solicitacao/isencao-iptu/" + solicitacaoId);
        return pages.dataServices.get(url);
    }

    return {  
        obterTodos,
        salvar,
        obterSolicitacaoId
    };
}();
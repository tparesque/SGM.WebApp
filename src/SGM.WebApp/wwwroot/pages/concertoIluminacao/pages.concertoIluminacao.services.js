var pages = pages || {};
pages.concertoIluminacao = pages.concertoIluminacao || {};

pages.concertoIluminacao.services = function () { 

    var EPerfil = {
        ADMINISTRADOR: "Administrador",
        GESTOR: "Gestor",
        USUARIO: "Usuario",
        FUNCIONARIO: "Funcionário"
    };  

    var obterTodos = function () {
        var url = pages.metadata.actionUrl("/api/solicitacaoReparo");
        return pages.dataServices.get(url);
    }

    var obterSolicitacaoId = function (solicitacaoId) {
        var url = pages.metadata.actionUrl("/api/solicitacaoReparo/" + solicitacaoId);
        return pages.dataServices.get(url);
    }

    var salvar = function (parametro) {
        var url = pages.metadata.actionUrl("/api/solicitacaoReparo");
        return pages.dataServices.postAjax(url, parametro);
    }  

    var deletar = function (solicitacaoId) {
        var url = pages.metadata.actionUrl("/api/solicitacaoReparo/" + solicitacaoId);
        return pages.dataServices.deleteAjax(url);
    }

    var iniciarAtendimento = function (solicitacaoId, parametro) {
        var url = pages.metadata.actionUrl("/api/solicitacaoReparo/" + solicitacaoId + "/iniciarAtendimento");
        return pages.dataServices.putAjax(url, parametro);
    }

    var finalizarAtendimento = function (solicitacaoId, parametro) {
        var url = pages.metadata.actionUrl("/api/solicitacaoReparo/" + solicitacaoId + "/finalizarAtendimento");
        return pages.dataServices.putAjax(url, parametro);
    } 

    var obterMunicipioPorEstadoId = function (estadoId) {
        var url = pages.metadata.actionUrl("/api/municipios/estado/" + estadoId);
        return pages.dataServices.get(url);
    }

    var obterEstados = function () {
        var url = pages.metadata.actionUrl("/api/estados");
        return pages.dataServices.get(url);
    }

    return {  
        EPerfil,
        obterTodos,
        obterSolicitacaoId,
        obterMunicipioPorEstadoId,
        obterEstados,
        salvar,
        deletar,
        iniciarAtendimento,
        finalizarAtendimento
    };
}();
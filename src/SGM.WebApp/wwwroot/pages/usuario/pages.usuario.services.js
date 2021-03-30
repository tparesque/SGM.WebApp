var pages = pages || {};
pages.usuario = pages.usuario || {};

pages.usuario.services = function () {  

    var EPerfil = {
        ADMINISTRADOR: "Administrador",
        GESTOR: "Gestor",
        USUARIO: "Usuario",
        FUNCIONARIO: "Funcionário"
    };    

    var obterTodos = function () {
        var url = pages.metadata.actionUrl("/api/gateway/usuarios");
        return pages.dataServices.get(url);
    }

    var obterPorId = function (id) {
        var url = pages.metadata.actionUrl("/api/gateway/usuarios/" + id);
        return pages.dataServices.get(url);
    }

    var salvar = function (parametro) {
        var url = pages.metadata.actionUrl("/api/gateway/usuarios");
        return pages.dataServices.postAjax(url, parametro);
    }    

    var atualizar = function (id, parametro) {
        var url = pages.metadata.actionUrl("/api/gateway/usuarios/" + id);
        return pages.dataServices.putAjax(url, parametro);
    }   

    var deletar = function (id) {
        var url = pages.metadata.actionUrl("/api/gateway/usuarios/" + id);
        return pages.dataServices.deleteAjax(url);
    }  

    var obterMunicipioPorEstadoId = function (estadoId) {
        var url = pages.metadata.actionUrl("/api/gateway/municipios/estado/" + estadoId);
        return pages.dataServices.get(url);
    }

    var obterEstados = function () {
        var url = pages.metadata.actionUrl("/api/gateway/estados");
        return pages.dataServices.get(url);
    }

    return {    
        EPerfil,
        obterEstados,
        obterMunicipioPorEstadoId,       
        obterTodos,
        obterPorId,
        atualizar,
        salvar,
        deletar
    };
}();
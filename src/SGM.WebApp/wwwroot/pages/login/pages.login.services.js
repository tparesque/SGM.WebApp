var pages = pages || {};
pages.login = pages.login || {};

pages.login.services = function () {

    var ETelaLogin = {
        LOGIN: 1,
        CADASTRO: 2,
        RECUPERACAO: 3
    };

    var login = function (parametro) {
        var url = pages.metadata.actionUrlWeb("/login");
        return pages.dataServices.postAjax(url, parametro);
    }  

    var salvar = function (parametro) {
        var url = pages.metadata.actionUrl("/api/gateway/autenticacao");
        return pages.dataServices.postAjax(url, parametro);
    }

    var recuperarSenha = function (parametro) {
        var url = pages.metadata.actionUrl("/api/gateway/autenticacao/enviar-email-recuperacao-senha");
        return pages.dataServices.postAjax(url, parametro);
    }    

    return {
        ETelaLogin,        
        login,       
        salvar,
        recuperarSenha
    };
}();
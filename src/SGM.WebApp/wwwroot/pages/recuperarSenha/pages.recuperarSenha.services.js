var pages = pages || {};
pages.recuperarSenha = pages.recuperarSenha || {};

pages.recuperarSenha.services = function () {  
    
    var recuperarSenha = function (parametro) {
        var url = pages.metadata.actionUrl("/api/gateway/autenticacao/recuperar-senha");
        return pages.dataServices.postAjax(url, parametro);
    }    

    return {      
        recuperarSenha
    };
}();
var pages = pages || {};
pages.menu = pages.menu || {};

pages.menu.services = function () {  

    var EPerfil = {
        ADMINISTRADOR: "Administrador",
        GESTOR: "Gestor",
        USUARIO: "Usuario",
        FUNCIONARIO: "Funcionário"
    };

    var logoff = function () {
        var url = pages.metadata.actionUrlWeb("/logoff");
        return pages.dataServices.get(url);
    }  

    return {
        EPerfil,       
        logoff
    };
}();
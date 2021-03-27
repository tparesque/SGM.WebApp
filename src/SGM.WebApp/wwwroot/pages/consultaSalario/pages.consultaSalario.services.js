var pages = pages || {};
pages.consultaSalario = pages.consultaSalario || {};

pages.consultaSalario.services = function () {  

    var obterTodos = function (parametros) {
        var url = pages.metadata.actionUrlParams("/api/salarioServidor", parametros);
        return pages.dataServices.get(url);       
    }   

    return {  
        obterTodos        
    };
}();
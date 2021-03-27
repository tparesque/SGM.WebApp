var pages = pages || {};
pages.menu = pages.menu || {};
pages.menu.model = pages.menu.model || {};
pages.menu.services = pages.menu.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.menu.viewModel = function () {   
    var model = pages.menu.model;
    var service = pages.menu.services;

    var viewModelMenu = new function () {
        var self = this;       
        
        self.usuarioLogado = ko.observable(new model.vmUsuarioLogado(getDataToken()));          

        self.redirecionarPerfil = function () {
            pages.dataServices.bloquearTela();
            window.location.href = "/Perfil/Index/" + self.usuarioLogado().id();
        };

        self.atualizarNome = function (nome) {
            atualizarNome(nome);
            self.usuarioLogado().nome(nome);
        };

        self.webLogoff = function () {
            service.logoff().then(() => {
                localStorage.removeItem("token");
                window.location.href = "/"; 
            });
        };

        self.obterUsuarioLogado = function () {            
            return self.usuarioLogado();
        };

        self.exibeMenuHome = ko.computed(function () {            
            if (self.usuarioLogado() &&
                (
                    self.usuarioLogado().perfil() === service.EPerfil.ADMINISTRADOR ||
                    self.usuarioLogado().perfil() === service.EPerfil.GESTOR ||
                    self.usuarioLogado().perfil() === service.EPerfil.USUARIO ||
                    self.usuarioLogado().perfil() === service.EPerfil.FUNCIONARIO
                ))
                return true;

            return false;
        });   

        self.exibeMenuGeoreferencia = ko.computed(function () {
            if (self.usuarioLogado() &&
                (
                    self.usuarioLogado().perfil() === service.EPerfil.ADMINISTRADOR ||
                    self.usuarioLogado().perfil() === service.EPerfil.GESTOR
                ))
                return true;

            return false;
        });   

        self.exibeMenuGestaoProjeto = ko.computed(function () {
            if (self.usuarioLogado() &&
                (
                    self.usuarioLogado().perfil() === service.EPerfil.ADMINISTRADOR ||
                    self.usuarioLogado().perfil() === service.EPerfil.GESTOR
                ))
                return true;

            return false;
        });   
       
        self.exibeMenuUsuario = ko.computed(function () {
            if (self.usuarioLogado() &&
                (
                    self.usuarioLogado().perfil() === service.EPerfil.ADMINISTRADOR 
                ))
                return true;

            return false;
        });

        
    };

    ko.applyBindings(viewModelMenu, binding);    
    return viewModelMenu;
}();
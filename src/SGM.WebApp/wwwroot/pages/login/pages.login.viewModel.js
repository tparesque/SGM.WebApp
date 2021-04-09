var pages = pages || {};
pages.login = pages.login || {};
pages.login.services = pages.login.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.login.viewModel = function () {    
    var service = pages.login.services;
   
    ko.applyBindings(new function () {
        var self = this;
        
        self.ETelaLogin = service.ETelaLogin;
        self.telaAtual = ko.observable(service.ETelaLogin.LOGIN);
        self.nome = ko.observable();
        self.email = ko.observable();
        self.senha = ko.observable();
        self.confirmarSenha = ko.observable();
       
        self.init = async function () {           
        };
       
        self.limpar = function () {
            self.nome('');
            self.email('');
            self.senha('');
            self.confirmarSenha('');
        }

        self.alterarTela = function (telaAtual) {
            self.telaAtual(telaAtual);           
        }
        
        self.validarLogin = function () {
            var mensagens = [];

            if (isNullOrEmptyOrWriteSpace(self.email()))
                mensagens.push("<strong>E-mail</strong> é obrigatório!");
            if (isNullOrEmptyOrWriteSpace(self.senha()))
                mensagens.push("<strong>Senha</strong> é obrigatório!");
           
            if (mensagens.any()) {
                bootbox.alert(mensagens.join("</br>"));
                return false;
            }
            return true;
        }

        self.login = function () {
            
            if (!self.validarLogin()) { return; }

            var parametro = {
                Email: self.email(),
                Senha: self.senha()
            };

            pages.dataServices.bloquearTela();
            service.login(parametro).then(function (result) {
                console.log(result.data)
                localStorage.setItem("token", JSON.stringify(result.data));
                redirectToPageByRole();
            }).catch(function (result) {
                bootbox.alert(result.data);
            }).finally(function () {
                pages.dataServices.desbloquearTela();
            });
        };


        self.validarCadastro = function () {
            var mensagens = [];

            if (isNullOrEmptyOrWriteSpace(self.nome()))
                mensagens.push("<strong>Nome</strong> é obrigatório!");
            if (isNullOrEmptyOrWriteSpace(self.email()))
                mensagens.push("<strong>E-mail</strong> é obrigatório!");
            if (isNullOrEmptyOrWriteSpace(self.senha()))
                mensagens.push("<strong>Senha</strong> é obrigatório!");
            if (isNullOrEmptyOrWriteSpace(self.confirmarSenha()))
                mensagens.push("<strong>Confirmar Senha</strong> é obrigatório!");
            if (self.senha() !== self.confirmarSenha())
                mensagens.push("<strong>Senha</strong> e <strong>Confirmar Senha</strong> devem ser iguais!");

            if (mensagens.any()) {
                bootbox.alert(mensagens.join("</br>"));
                return false;
            }
            return true;
        }

        self.salvar = function () {

            if (!self.validarCadastro()) { return; }

            var parametro = {
                nome: self.nome(),
                email: self.email(),
                senha: self.senha()
            };

            pages.dataServices.bloquearTela();
            service.salvar(parametro).then(function () {
                bootbox.alert("Usuario cadastrado com sucesso!");
                self.limpar();
                self.alterarTela(service.ETelaLogin.LOGIN)
            }).catch(function (result) {
                if (result.exibeMensagem)
                    bootbox.alert(result.data);
            }).finally(function () {
                pages.dataServices.desbloquearTela();
            });
        };

        self.validarRecuperarSenha = function () {
            var mensagens = [];
            
            if (isNullOrEmptyOrWriteSpace(self.email()))
                mensagens.push("<strong>E-mail</strong> é obrigatório!");            

            if (mensagens.any()) {
                bootbox.alert(mensagens.join("</br>"));
                return false;
            }
            return true;
        }

        self.recuperarSenha = function () {

            if (!self.validarRecuperarSenha()) { return; }

            var parametro = {               
                email: self.email()
            };

            pages.dataServices.bloquearTela();
            service.recuperarSenha(parametro).then(function () {
                bootbox.alert("Enviado e-mail para cadastrar nova senha!");
                self.limpar();
                self.alterarTela(service.ETelaLogin.LOGIN)
            }).catch(function (result) {
                if (result.exibeMensagem)
                    bootbox.alert(result.data);
            }).finally(function () {
                pages.dataServices.desbloquearTela();
            });
        }; 

        self.init();

    }, bindingBody);
}();
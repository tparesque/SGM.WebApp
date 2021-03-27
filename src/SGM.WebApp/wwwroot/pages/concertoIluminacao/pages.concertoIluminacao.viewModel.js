var pages = pages || {};
pages.concertoIluminacao = pages.concertoIluminacao || {};
pages.concertoIluminacao.model = pages.concertoIluminacao.model || {};
pages.concertoIluminacao.services = pages.concertoIluminacao.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.concertoIluminacao.viewModel = function () {   
    var model = pages.concertoIluminacao.model;
    var service = pages.concertoIluminacao.services;
   
    var viewModelSolicitacaoIluminacao = new function () {
        var self = this;       

        self.usuarioLogado = ko.observable(new pages.menu.model.vmUsuarioLogado(getDataToken()));     
        self.solicitacoes = ko.observableArray([]);
        self.datatable = ko.observable();

        self.init = function () {  
            self.obterSolicitacoes();
        };        

        self.obterSolicitacoes = function () {
            pages.dataServices.bloquearTela();
            service.obterTodos().then(function (result) {
                result.data.forEach(function (item) {
                    self.solicitacoes.push(new model.vmSolicitacao(item, self.usuarioLogado().perfil()));
                });
            }).catch(function (result) {
                console.log(result.data);
            }).finally(function () {
                self.inicializarDatatable();
                pages.dataServices.desbloquearTela();
            });
        };

        self.inicializarDatatable = function () {
            var table = $('#datatable-solicitacao-iluminacao').DataTable({
                lengthChange: false,
                order: [[0, 'asc']],
                responsive: true,
                columnDefs: [                    
                    {
                        targets: [4],
                        orderable: false,
                        searchable: false,
                        className: "text-center"
                    }],
                buttons: [
                    {
                        extend: 'pdfHtml5',
                        title: 'Listagem Solicitação de Concerto Iluminação'
                    },
                ],
                language: pages.utils.languageDataTablePtBr
            });

            table.buttons().container().appendTo('#datatable-solicitacao-iluminacao_wrapper .col-md-6:eq(0)');
            self.datatable(table);
        }; 

        self.visualizar = function (solicitacaoId) {
            pages.dataServices.bloquearTela();
            window.location.href = "/ConcertoIluminacao/Visualizar/" + solicitacaoId;
        };

        self.excluir = function (solicitacaoId) {
            bootbox.dialog({
                closeButton: false,
                message: "Confirma a exclusão da solicitação?",
                buttons: {
                    nao: {
                        label: "NÃO",
                        className: "btn-sm btn-danger"
                    },
                    sim: {
                        label: "SIM",
                        className: "btn-sm btn-primary",
                        callback: function () {
                            pages.dataServices.bloquearTela();
                            service.deletar(solicitacaoId).then(function () {
                                bootbox.alert("Solicitação excluído com sucesso!", function () {
                                    location.reload();
                                });
                            }).catch(function (result) {
                                if (result.exibeMensagem)
                                    bootbox.alert(result.data);
                            }).finally(function () {
                                pages.dataServices.desbloquearTela();
                            });
                        }
                    }
                }
            });
        };

        self.iniciarAtendimento = function (solicitacaoId) {
            bootbox.dialog({
                closeButton: false,
                message: "Confirma início do atendimento da solicitação?",
                buttons: {
                    nao: {
                        label: "NÃO",
                        className: "btn-sm btn-danger"
                    },
                    sim: {
                        label: "SIM",
                        className: "btn-sm btn-primary",
                        callback: function () {
                            pages.dataServices.bloquearTela();
                            service.iniciarAtendimento(solicitacaoId).then(function () {
                                bootbox.alert("Atendimento da solicitação iniciado com sucesso!", function () {
                                    location.reload();
                                });
                            }).catch(function (result) {
                                if (result.exibeMensagem)
                                    bootbox.alert(result.data);
                            }).finally(function () {
                                pages.dataServices.desbloquearTela();
                            });
                        }
                    }
                }
            });
        };

        self.finalizarAtendimento = function (solicitacaoId) {
            bootbox.dialog({
                closeButton: false,
                message: "Confirma o término do atendimento da solicitação?",
                buttons: {
                    nao: {
                        label: "NÃO",
                        className: "btn-sm btn-danger"
                    },
                    sim: {
                        label: "SIM",
                        className: "btn-sm btn-primary",
                        callback: function () {
                            pages.dataServices.bloquearTela();
                            service.finalizarAtendimento(solicitacaoId).then(function () {
                                bootbox.alert("Atendimento da solicitação finalizado com sucesso!", function () {
                                    location.reload();
                                });
                            }).catch(function (result) {
                                if (result.exibeMensagem)
                                    bootbox.alert(result.data);
                            }).finally(function () {
                                pages.dataServices.desbloquearTela();
                            });
                        }
                    }
                }
            });
        };

        self.init();

    };

    ko.applyBindings(viewModelSolicitacaoIluminacao, bindingBody);     

    $('#datatable-solicitacao-iluminacao tbody').on('click', '#btnExcluir', function (event) {
        var solicitacaoId = event.currentTarget.value;
        viewModelSolicitacaoIluminacao.excluir(solicitacaoId);
    });

    $('#datatable-solicitacao-iluminacao tbody').on('click', '#btnIniciarAtendimento', function (event) {
        var solicitacaoId = event.currentTarget.value;
        viewModelSolicitacaoIluminacao.iniciarAtendimento(solicitacaoId);
    });

    $('#datatable-solicitacao-iluminacao tbody').on('click', '#btnFinalizarAtendimento', function (event) {
        var solicitacaoId = event.currentTarget.value;
        viewModelSolicitacaoIluminacao.finalizarAtendimento(solicitacaoId);
    });

    $('#datatable-solicitacao-iluminacao tbody').on('click', '#btnVisualizar', function (event) {
        var solicitacaoId = event.currentTarget.value;
        viewModelSolicitacaoIluminacao.visualizar(solicitacaoId);
    });
}();
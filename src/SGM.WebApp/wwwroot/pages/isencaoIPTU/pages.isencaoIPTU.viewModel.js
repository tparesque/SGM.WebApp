var pages = pages || {};
pages.isencaoIPTU = pages.isencaoIPTU || {};
pages.isencaoIPTU.model = pages.isencaoIPTU.model || {};
pages.isencaoIPTU.services = pages.isencaoIPTU.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.isencaoIPTU.viewModel = function () {   
    var model = pages.isencaoIPTU.model;
    var service = pages.isencaoIPTU.services;
   
    var viewModelSolicitacaoIsencaoIPTU = new function () {
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
                    self.solicitacoes.push(new model.vmSolicitacao(item));
                });
            }).catch(function (result) {
                console.log(result.data);
            }).finally(function () {
                self.inicializarDatatable();
                pages.dataServices.desbloquearTela();
            });
        };

        self.inicializarDatatable = function () {
            var table = $('#datatable-solicitacao-isencaoIPTU').DataTable({
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
                        title: 'Listagem Solicitação de Isenção de IPTU'
                    },
                ],
                language: pages.utils.languageDataTablePtBr
            });

            table.buttons().container().appendTo('#datatable-solicitacao-isencaoIPTU_wrapper .col-md-6:eq(0)');
            self.datatable(table);
        };

        self.visualizar = function (solicitacaoId) {
            pages.dataServices.bloquearTela();
            window.location.href = "/IsencaoIPTU/Visualizar/" + solicitacaoId;
        };

        self.init();

    };

    ko.applyBindings(viewModelSolicitacaoIsencaoIPTU, bindingBody);

    $('#datatable-solicitacao-isencaoIPTU tbody').on('click', '#btnVisualizar', function (event) {
        var solicitacaoId = event.currentTarget.value;
        viewModelSolicitacaoIsencaoIPTU.visualizar(solicitacaoId);
    });

}();
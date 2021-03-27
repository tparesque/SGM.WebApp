var pages = pages || {};
pages.consultaSalario = pages.consultaSalario || {};
pages.consultaSalario.model = pages.consultaSalario.model || {};
pages.consultaSalario.services = pages.consultaSalario.services || {};

pages.metadata = pages.metadata || {};
pages.dataServices = pages.dataServices || {};
pages.utils = pages.utils || {};

pages.consultaSalario.viewModel = function () {   
    var model = pages.consultaSalario.model;
    var service = pages.consultaSalario.services;
    var table = null;
    ko.applyBindings(new function () {
        var self = this;
        
        self.usuarioLogado = ko.observable(new pages.menu.model.vmUsuarioLogado(getDataToken()));
        self.salarios = ko.observableArray([]);            
        self.filtros = ko.observable(new model.vmFiltro());       

        self.init = function () {
            self.consultarSalarios();
        };

        self.limpar = function () {
            self.filtros(new model.vmFiltro()); 
            self.consultarSalarios();
        };

        self.consultarSalarios = function () {
            if (table)
                table.clear().destroy();
            self.salarios([]);
            
            pages.dataServices.bloquearTela();
            service.obterTodos(ko.toJS(self.filtros())).then(function (result) {
                result.data.forEach(function (item) {
                    self.salarios.push(new model.vmSalario(item));
                });
            }).catch(function (result) {
                console.log(result.data);
            }).finally(function () {
                self.inicializarDatatable();
                pages.dataServices.desbloquearTela();
            });
        };        

        self.inicializarDatatable = function () {
            table = $('#datatable-salarios').DataTable({
                lengthChange: false,
                searching: false,
                order: [[0, 'asc']],
                responsive: true,                
                language: pages.utils.languageDataTablePtBr
            });                 
        };        

        self.init();

    }, bindingBody);
}();
var pages = pages || {};
pages.consultaSalario = pages.consultaSalario || {};

pages.consultaSalario.model = function () {    

    var vmSalario = function (salario) {
        var self = this;

        self.salarioServidorId = ko.observable();
        self.matricula = ko.observable();
        self.nome = ko.observable();
        self.lotacao = ko.observable();
        self.mesReferencia = ko.observable();
        self.anoReferencia = ko.observable();
        self.remuneracaoBruta = ko.observable();
        self.descontos = ko.observable();        
        self.remuneracaoLiquida = ko.observable();        

        if (salario) {
            self.salarioServidorId(salario.salarioServidorId);
            self.matricula(salario.matricula);
            self.nome(salario.nome);
            self.lotacao(salario.lotacao);
            self.mesReferencia(salario.mesReferencia);
            self.anoReferencia(salario.anoReferencia);
            self.remuneracaoBruta(salario.remuneracaoBruta);
            self.descontos(salario.descontos);            
            self.remuneracaoLiquida(salario.valorLiquido);            
        }
    };

    var vmFiltro = function () {
        var self = this;

        self.nome = ko.observable();
        self.matricula = ko.observable();
        self.mesReferencia = ko.observable();
        self.anoReferencia = ko.observable();  
    };

    return {   
        vmSalario,
        vmFiltro
    };
}();
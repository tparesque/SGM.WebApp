using System.ComponentModel;

namespace SGM.WebApp.Enumerators
{
    public enum EStatusCode
    {
        [Description("OK")]
        OK = 200,       
        [Description("Erro de Validação")]
        ERRO_VALIDACAO = 400,      
        [Description("Erro interno do sistema")]
        ERRO_INTERNO = 500

    }
}

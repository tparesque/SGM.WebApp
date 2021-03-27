using System.Collections.Generic;

namespace SGM.WebApp.Models
{   
    public class UsuarioLogin
    {    
        public string Email { get; set; }        
        public string Senha { get; set; }
    }

    public class Result<TResult>
    {
        public int StatusCode { get; set; }
        public TResult Data { get; set; }
        public ICollection<string> Errors { get; set; } = new List<string>();
    }

    public class UsuarioRespostaLogin
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public bool Authenticated { get; set; }
        public string Created { get; set; }
        public string Expiration { get; set; }
        public string AccessToken { get; set; }
        public string Role { get; set; }
        public bool IsAdministrador { get; set; }
    }    
}
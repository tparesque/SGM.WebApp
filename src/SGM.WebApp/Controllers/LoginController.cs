using Microsoft.AspNetCore.Mvc;
using SGM.WebApp.Enumerators;
using SGM.WebApp.Models;
using SGM.WebApp.Services;
using System.Threading.Tasks;

namespace SGM.WebApp.Controllers
{    
    public class LoginController : Controller
    {
        private readonly IAutenticacaoService _autenticacaoService;
        public LoginController(IAutenticacaoService autenticacaoService)
        {
            _autenticacaoService = autenticacaoService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("login")]
        public async Task<Result<UsuarioRespostaLogin>> Login([FromBody] UsuarioLogin usuarioLogin)
        {      
            var resposta = await _autenticacaoService.Login(usuarioLogin);
            if (resposta.StatusCode != (int)EStatusCode.OK) return resposta;            

            await _autenticacaoService.RealizarLogin(resposta.Data);
            return resposta;
        }

        [HttpGet]
        [Route("logoff")]
        public async Task<Result<bool>> Logout()
        {
            await _autenticacaoService.Logout();
            return new Result<bool>() { StatusCode = (int)EStatusCode.OK };
        }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace SGM.WebApp.Controllers
{
    [Route("recuperar-senha")]
    public class RecuperarSenhaController : Controller
    {
        [Route("atualizar-senha")]
        public IActionResult Index()
        {
            return View();
        }
    }
}

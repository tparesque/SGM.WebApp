using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SGM.WebApp.Controllers
{
    [Authorize(Roles = "Administrador,Gestor,Usuario,Funcionário")]
    public class IsencaoIPTUController : Controller
    {       
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Cadastro()
        {
            return View();
        }

        public IActionResult Visualizar()
        {
            return View();
        }
    }
}

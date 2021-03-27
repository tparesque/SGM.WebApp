using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SGM.WebApp.Controllers
{
    [Authorize(Roles = "Administrador,Gestor")]
    public class GestaoProjetoController : Controller
    {       
        public IActionResult Index()
        {
            return View();
        }
    }
}

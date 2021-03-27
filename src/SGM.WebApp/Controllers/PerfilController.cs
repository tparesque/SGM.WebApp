using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SGM.WebApp.Controllers
{
    [Authorize(Roles = "Administrador,Gestor,Usuario,Funcionário")]
    public class PerfilController : Controller
    {       
        public IActionResult Index(string id)
        {
            return View();
        }
    }
}

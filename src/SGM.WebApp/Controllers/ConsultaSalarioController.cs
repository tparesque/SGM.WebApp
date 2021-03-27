using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SGM.WebApp.Controllers
{
    [Authorize(Roles = "Administrador,Gestor,Usuario,Funcionário")]
    public class ConsultaSalarioController : Controller
    {       
        public IActionResult Index()
        {
            return View();
        }
    }
}

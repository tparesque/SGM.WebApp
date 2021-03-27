using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using SGM.WebApp.Usuario;
using SGM.WebApp.Services;

namespace SGM.WebApp.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void AddDependencyInjection(this IServiceCollection services)
        {            
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IAspNetUser, AspNetUser>();

            services.AddHttpClient<IAutenticacaoService, AutenticacaoService>();
        }
    }
}

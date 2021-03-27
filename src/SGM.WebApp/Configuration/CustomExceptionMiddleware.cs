using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SGM.WebApp.Models;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace SGM.WebApp.Configuration
{
    public class CustomExceptionMiddleware
    {
        private readonly JsonSerializer _serializer;        

        public CustomExceptionMiddleware()
        {
            _serializer = new JsonSerializer
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };        
        }

        public async Task Invoke(HttpContext context)
        {
            var ex = context.Features.Get<IExceptionHandlerFeature>()?.Error;

            if (ex == null) return;

            using (var writer = new StreamWriter(context.Response.Body))
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";
                var message = !string.IsNullOrEmpty(ex.Message) ? ex.Message : "Erro interno de sistema.";
                var result = new Result<bool>();
                result.Errors.Add(message);
                _serializer.Serialize(writer, result);
                await writer.FlushAsync().ConfigureAwait(false);
            }
        }
       
    }
}

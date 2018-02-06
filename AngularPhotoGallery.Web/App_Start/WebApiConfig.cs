using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AngularPhotoGallery.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var resolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
            resolver.IgnoreSerializableAttribute = true;
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = resolver;
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}

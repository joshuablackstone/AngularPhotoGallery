using AngularPhotoGallery.Web.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace AngularPhotoGallery.Web.Controllers
{
    [RoutePrefix("api/images")]
    public class ImagesController : ApiController
    {
        protected static ObservableCollection<Photo> photos = new ObservableCollection<Photo>();
        protected string localPath = string.Empty;

        public ImagesController()
        {
            localPath = HostingEnvironment.MapPath("~/Images");
            var _photos = GetPhotos();
            foreach (var photo in _photos)
            {
                var exists = photos.FirstOrDefault(p => p.Id == photo.Id);
                if (exists == null)
                {
                    photos.Add(photo);
                }
            }
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(photos.ToList());
        }

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult Get(int id)
        {
            var model = photos.FirstOrDefault(p => p.Id == id);
            if (model == null)
            {
                return BadRequest();
            }

            return Ok(model);
        }

        // POST api/values
        [Route("createImage")]
        [HttpPost]
        public async Task<IHttpActionResult> Post()
        {
            var request = HttpContext.Current.Request;
            var _model = request.Form["model"];
            Photo model = JsonConvert.DeserializeObject<Photo>(_model);

            this.Validate(model);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!Directory.Exists(localPath)) { Directory.CreateDirectory(localPath); }

            if (!Request.Content.IsMimeMultipartContent())
            { throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.UnsupportedMediaType)); }

            var provider = new MultipartFormDataStreamProvider(localPath);
            await Request.Content.ReadAsMultipartAsync(provider);
            var file = provider.FileData[0];

            var fileName = Path.GetFileName(file.Headers.ContentDisposition.FileName.Trim('\"'));
            var newFilePath = Path.Combine(localPath, fileName);

            if (File.Exists(newFilePath))
            { File.Delete(newFilePath); }

            File.Move(file.LocalFileName, newFilePath);

            var photo = new Photo()
            {
                Id = photos.Select(p => p.Id).Max() + 1,
                Title = model.Title == null ? fileName : model.Title,
                Description = model.Description,
                ImageUrl = fileName,
                DateCreated = DateTime.Now
            };

            photos.Add(photo);

            return Ok(photo);
        }

        // PUT api/values/5
        [HttpPost]
        [Route("updateImage/{id}")]
        public IHttpActionResult Put(int id, [FromBody]Photo model)
        {
            var photo = photos.FirstOrDefault(p => p.Id == id);
            if (photo == null)
            {
                return BadRequest();
            }

            photo.Title = model.Title;
            photo.Description = model.Description;
            photo.DateModified = DateTime.Now;

            return Ok(photo);
        }

        [HttpPost]
        [Route("deleteImage/{id}")]
        public IHttpActionResult Delete(int id)
        {
            var model = photos.FirstOrDefault(p => p.Id == id);
            if (model == null)
            {
                return BadRequest();
            }

            if (Directory.Exists(localPath))
            {
                var file = Path.Combine(localPath, model.ImageUrl);
                if (File.Exists(file))
                {
                    File.Delete(file);
                }
            }

            photos.Remove(model);

            return Ok();
        }

        private List<Photo> GetPhotos()
        {
            var model = new List<Photo>();
            if (Directory.Exists(localPath))
            {
                var files = Directory.EnumerateFiles(localPath);
                if (files.Count() > 0)
                {
                    var id = 1;
                    foreach (var localFile in files)
                    {
                        var fileName = Path.GetFileName(localFile);
                        var fi = new FileInfo(localFile);
                        var dateCreated = fi.CreationTime;
                        //var mime = System.Web.MimeMapping.GetMimeMapping(localFile);

                        model.Add(new Photo { Id = id, Title = fileName, ImageUrl = fileName, DateCreated = dateCreated });
                        id++;
                    }
                }
            }

            return model.OrderBy(e => e.Id).ToList();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace RazorPagesApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            DataSet ds = new DataSet();

            ds.ReadXml("./Pages/counter.xml");

            int hits = Int32.Parse(ds.Tables[0].Rows[0]["hits"].ToString());

            hits += 1;

            ds.Tables[0].Rows[0]["hits"] = hits.ToString();

            ds.WriteXml("./Pages/counter.xml");
        }
    }
}

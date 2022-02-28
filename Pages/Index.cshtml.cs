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
            string file = "./Pages/counter.xml";
            if (System.IO.File.Exists(file))
            {
                Count(file);
            }
            else
            {
                DataSet ds = new DataSet("counter");

                DataTable dt = new DataTable("count");

                DataColumn column = new DataColumn("hits", System.Type.GetType("System.Int32"));
                dt.Columns.Add(column);
                DataRow row = dt.NewRow();
                row["hits"] = 1;
                dt.Rows.Add(row);

                ds.Tables.Add(dt);

                ds.WriteXml(file);
            }
        }

        private void Count(string file)
        {
            DataSet ds = new DataSet();

            ds.ReadXml(file);

            int hits = Int32.Parse(ds.Tables[0].Rows[0]["hits"].ToString());

            hits += 1;

            ds.Tables[0].Rows[0]["hits"] = hits.ToString();

            ds.WriteXml(file);
        }
    }
}

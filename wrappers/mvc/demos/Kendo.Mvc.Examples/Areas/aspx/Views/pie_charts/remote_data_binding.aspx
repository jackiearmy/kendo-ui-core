﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
         Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-content wide">
        <h3>1024x768 screen resolution trends</h3>

    <% foreach (var year in (IEnumerable<string>)ViewData["years"])
    {
        Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ScreenResolutionRemoteDataViewModel>()
           .Name("chart" + year)
           .Title(year)
           .HtmlAttributes(new { @class = "small-chart" })
           .Legend(legend => legend
               .Visible(false)
           )
           .DataSource(ds =>
           {
               ds.Read(read => read.Action("_SpainElectricityProduction", "Pie_Charts"));
               ds.Filter(filter => filter.Add(model => model.Year).IsEqualTo(year));
               ds.Sort(sort => sort.Add(model => model.Year).Ascending());
           }
           )
           .Series(series => series
                   .Pie(model => model.Share, model => model.Resolution, model => model.Color)
                   .Padding(0)
           )
           .Tooltip(tooltip => tooltip
               .Visible(true)
               .Format("{0:N0}")
               .Template("#= category # - #= kendo.format('{0:P}', percentage)#")
           ).Render();
     } %>
</div>
<style>
    .k-chart.small-chart {
        display: inline-block;
        width: 120px;
        height: 120px;
    }
</style>
</asp:Content>

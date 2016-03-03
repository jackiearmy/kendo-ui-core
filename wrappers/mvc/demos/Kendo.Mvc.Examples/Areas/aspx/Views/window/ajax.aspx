<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().Window()
    .Name("window")
    .Title("Rams's Ten Principles of Good Design")
    .Content("loading user info...")
    .LoadContentFrom("AjaxContent", "Window")
    .Draggable()
    .Events(ev => ev.Close("onClose"))
    .Resizable()
%>

<span id="undo" style="display:none" class="k-button hide-on-narrow">Click here to open the window.</span>

<div class="responsive-message"></div>

<script>
    function onClose() {
        $("#undo").show();
    }

    $(document).ready(function() {
        $("#undo").bind("click", function() {
                $("#window").data("kendoWindow").open();
                $("#undo").hide();
            });
    });
</script>

<style>
    #example {
        min-height: 840px;
    }

    #undo {
        text-align: center;
        position: absolute;
        white-space: nowrap;
        border-width: 1px;
        border-style: solid;
        padding: 2em;
        cursor: pointer;
    }
    
    @media screen and (max-width: 1023px) {
        div.k-window {
            display: none !important;
        }
    }
</style>
</asp:Content>
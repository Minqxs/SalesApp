using HotChocolate;
using HotChocolate.Types;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Interfaces;
using SalesManagementApp_Core.Services;

namespace SalesManagementApp_Core.Graphql;

public class Query
{
    [UsePaging(IncludeTotalCount = true)]
    public IQueryable<Product> GetProducts(
        [Service] ProductsRetrieverService productRetrieverService,
        AppDbContext dbContext)
    {
        return productRetrieverService.GetProducts(dbContext);
    }

    [UsePaging(IncludeTotalCount = true)]
    public IQueryable<Sale> GetSales(
        [Service] SalesRetrieverService salesRetrieverService,
        AppDbContext dbContext,
        DateTimeOffset? startDate,
        DateTimeOffset? endDate,
        string? productName)
    {
        var salesQuery = salesRetrieverService.GetSales(dbContext)
            .Where(sale =>
                (!startDate.HasValue || sale.SaleDate >= startDate.Value) &&
                (!endDate.HasValue || sale.SaleDate <= endDate.Value) &&
                (string.IsNullOrEmpty(productName) ||
                 sale.Products.Any(product => product.Description == productName)));
        return salesQuery;
    }
}
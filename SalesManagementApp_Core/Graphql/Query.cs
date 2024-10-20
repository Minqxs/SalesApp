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
    [UseFiltering]
    public IQueryable<Product> GetProducts([Service] ProductsRetrieverService productRetrieverService, AppDbContext dbContext)
    {
        return productRetrieverService.GetProducts(dbContext);
    }

    [UsePaging(IncludeTotalCount = true)]
    [UseFiltering]
    public IQueryable<Sale> GetSales([Service] SalesRetrieverService salesRetrieverService, AppDbContext dbContext)
    {
        return salesRetrieverService.GetSales(dbContext);
    }
}
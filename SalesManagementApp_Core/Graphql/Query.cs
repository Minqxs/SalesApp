using HotChocolate;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Interfaces;

namespace SalesManagementApp_Core.Graphql;

public class Query
{
    [UseFiltering]
    public IQueryable<Product> GetProducts([Service] IProductService productService)
    {
        return productService.GetProducts();
    }

    [UseFiltering]
    public IQueryable<Sale> GetSales([Service] ISaleService saleService)
    {
        return saleService.GetSales();
    }
}
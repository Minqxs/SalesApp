using HotChocolate;
using HotChocolate.Types;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Services;

namespace SalesManagementApp_Core.Graphql;

public class Mutations
{
    public async Task<Product> CreateProduct(
        [Service] ProductService productService,
        AppDbContext dbContext,
        ProductService.CreateProductInput input)
    {
        var response = await productService.CreateProduct( dbContext, input);
        return response;
    }

    public async Task<Product> EditProduct(
        [Service] ProductService productService,
        AppDbContext dbContext,
        ProductService.EditProductInput input)
    {
        var response = await productService.EditProduct( dbContext, input);
        return response;
    }
}
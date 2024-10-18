using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Interfaces;

namespace SalesManagementApp_Core.Services;

public class ProductService : IProductService
{
    private readonly AppDbContextService dbContextService;

    public ProductService(AppDbContextService _dbContext)
    {
        dbContextService = _dbContext;
    }

    public IQueryable<Product> GetProducts()
    {
        var context = this.dbContextService.CreateAndVerifyContext();
        return context.Products;
    }

    public Task<Product> CreateProduct()
    {
        throw new NotImplementedException();
    }

    public Task<Product> EditProduct()
    {
        throw new NotImplementedException();
    }

    public Task<Product> DeleteProduct()
    {
        throw new NotImplementedException();
    }
}
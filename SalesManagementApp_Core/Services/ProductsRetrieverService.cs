using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;

namespace SalesManagementApp_Core.Services;

public class ProductsRetrieverService
{
    public IQueryable<Product> GetProducts(AppDbContext dbContext)
    {
        return dbContext.Products;
    }

    public async Task<Product> GetProductById(AppDbContext dbContext, string productId)
    {
        return await dbContext.Products.FirstOrDefaultAsync(p => p.Id == productId) ??
               throw new ArgumentException("Product was not found");
    }
}
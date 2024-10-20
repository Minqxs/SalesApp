using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Services;

namespace SalesManagementApp_Core.Interfaces;

public interface IProductService
{
    public Task<Product> CreateProduct(AppDbContext dbContext,ProductService.CreateProductInput createProductInput);

    public Task<Product> EditProduct (AppDbContext dbContext,ProductService.EditProductInput editProductInput);

    public Task<Product> DeleteProduct (AppDbContext dbContext,ProductService.DeleteProductInput deleteProductInput);

}
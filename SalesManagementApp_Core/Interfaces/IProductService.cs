using SalesManagementApp_Core.Entities;

namespace SalesManagementApp_Core.Interfaces;

public interface IProductService
{
    public IQueryable<Product> GetProducts ();

    public Task<Product> CreateProduct();

    public Task<Product> EditProduct ();

    public Task<Product> DeleteProduct ();

}
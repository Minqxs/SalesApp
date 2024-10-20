using HotChocolate.Types.Relay;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Interfaces;

namespace SalesManagementApp_Core.Services;

public class ProductService : IProductService
{
    private readonly ProductsRetrieverService productsRetrieverService;

    public ProductService(ProductsRetrieverService productsRetrieverService)
    {
        this.productsRetrieverService = productsRetrieverService;
    }


    public async Task<Product> CreateProduct(AppDbContext dbContext , CreateProductInput createProductInput)
    {
        var newProduct = new Product()
        {
            Description = createProductInput.Description,
            Price = createProductInput.Price,
            Image = createProductInput.Image,
        };
        await dbContext.Set<Product>().AddAsync(newProduct);
        await dbContext.SaveChangesAsync();

        return newProduct;
    }

    public async Task<Product> EditProduct(AppDbContext dbContext, EditProductInput editProductInput)
    {
        var product = await productsRetrieverService.GetProductById(dbContext, editProductInput.ProductId);

        product.Description = editProductInput.Description;
        product.Image = editProductInput.Image;
        product.Price = editProductInput.Price;

        dbContext.Update(product);
        await dbContext.SaveChangesAsync();
        return product;
    }

    public async Task<Product> DeleteProduct(AppDbContext dbContext, DeleteProductInput deleteProductInput)
    {
        var product = await productsRetrieverService.GetProductById(dbContext, deleteProductInput.ProductId);
        product.IsDeleted = true;
        dbContext.Update(product);
        await dbContext.SaveChangesAsync();
        return product;
    }

    public record CreateProductInput(string Description, double Price, string? Image);
    public record EditProductInput([property:ID] int ProductId ,string Description, double Price, string? Image);
    public record DeleteProductInput([property:ID] int ProductId);
}
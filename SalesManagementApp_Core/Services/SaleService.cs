using HotChocolate.Types.Relay;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Interfaces;

namespace SalesManagementApp_Core.Services;

public class SaleService : ISaleService
{
    private readonly ProductsRetrieverService productsRetrieverService;
    private readonly SalesRetrieverService salesRetrieverService;

    public SaleService(ProductsRetrieverService _productsRetrieverService, SalesRetrieverService salesRetrieverService)
    {
        productsRetrieverService = _productsRetrieverService;
        this.salesRetrieverService = salesRetrieverService;
    }

    public async Task<Sale> CreateSale(AppDbContext dbContext, CreateSaleInput createSaleInput )
    {
        List<Product> productInSale = new List<Product>();

        foreach (var productId in createSaleInput.ProductIds)
        {
            var product = await productsRetrieverService.GetProductById(dbContext, productId);
            productInSale.Add(product);
        }

        var sale = new Sale()
        {
            Products = productInSale,
            SaleDate = DateTimeOffset.Now,
        };
        await dbContext.Set<Sale>().AddAsync(sale);
        await dbContext.SaveChangesAsync();
        return sale;

    }

    public async Task<Sale> EditSale(AppDbContext dbContext, EditSaleInput editSaleInput )
    {
        var sale = await salesRetrieverService.GetSalesById(dbContext, editSaleInput.SaleId);
        List<Product> productInSale = new List<Product>();

        foreach (var productId in editSaleInput.ProductIds)
        {
            var product = await productsRetrieverService.GetProductById(dbContext, productId);
            productInSale.Add(product);
        }

        sale.Products = productInSale;
        dbContext.Set<Sale>().Update(sale);
        await dbContext.SaveChangesAsync();
        return sale;
    }

    public async Task<Sale> DeleteSale(AppDbContext dbContext, DeleteSaleInput deleteSaleInput )
    {
        var sale = await salesRetrieverService.GetSalesById(dbContext, deleteSaleInput.SaleId);
        sale.IsDeleted = true;
        dbContext.Set<Sale>().Update(sale);
        await dbContext.SaveChangesAsync();
        return sale;
    }

    public record CreateSaleInput([property:ID<Product>] List<int> ProductIds);
    public record EditSaleInput([property:ID<Sale>] int SaleId ,[property:ID<Product>] List<int> ProductIds);
    public record DeleteSaleInput([property:ID<Sale>] int SaleId);

}
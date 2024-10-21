using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.Entities;
using Newtonsoft.Json;

namespace SalesManagementApp_Core.Services;


public class ApiRetrieverService
{
    private readonly HttpClient _httpClient;
    private readonly AppDbContextService _dbContextService;
    private readonly ProductsRetrieverService _productsRetrieverService;

    public ApiRetrieverService(HttpClient httpClient, AppDbContextService dbContextService, ProductsRetrieverService productsRetrieverService)
    {
        _httpClient = httpClient;
        _dbContextService = dbContextService;
        _productsRetrieverService = productsRetrieverService;
    }

    public async Task<List<JsonProduct>> GetProductsAsync()
    {
        var response =
            await _httpClient.GetAsync("https://singularsystems-tech-assessment-sales-api2.azurewebsites.net/products");

        if (response.IsSuccessStatusCode)
        {
            var jsonResponse = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<JsonProduct>>(jsonResponse);
        }

        return new List<JsonProduct>();
    }


    public async Task<List<JsonProductSale>> GetProductSaleAsync(string productId)
    {
        var response =
            await _httpClient.GetAsync(
                $"https://singularsystems-tech-assessment-sales-api2.azurewebsites.net/product-sales?Id={productId}");

        if (response.IsSuccessStatusCode)
        {
            var jsonResponse = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<JsonProductSale>>(jsonResponse);
        }

        return new List<JsonProductSale>();
    }

    public async Task<List<Product>> MapAndSaveProducts()
    {
        var dbContext = this._dbContextService.CreateAndVerifyContext();
        var jsonProducts = await this.GetProductsAsync();

        var existingProducts = this._productsRetrieverService.GetProducts(dbContext);

        var newProducts = new List<Product>();
        foreach (var jsonProduct in jsonProducts)
        {
            var existingProduct = existingProducts.FirstOrDefault(p => p.Id == jsonProduct.Id);
            if (existingProduct != null)
            {
                // Update the existing product with the new values from jsonProduct assumption is that the api is our source of truth
                existingProduct.Image = jsonProduct.Image;
                existingProduct.Description = jsonProduct.Description;
                existingProduct.Price = double.Parse(jsonProduct.SalePrice.ToString());
            }
            else
            {
                var newProduct = new Product
                {
                    Id = jsonProduct.Id, // for the already existing products we want to manually set the id
                    Image = jsonProduct.Image,
                    Description = jsonProduct.Description,
                    Price = double.Parse(jsonProduct.SalePrice.ToString()),
                };
                newProducts.Add(newProduct);
            }
        }

        await dbContext.AddRangeAsync(newProducts);
        await dbContext.SaveChangesAsync();

        return newProducts;
    }

    public async Task<List<Sale>> MapAndSaveProductSales()
    {
        var dbContext = this._dbContextService.CreateAndVerifyContext();
        var products =await this._productsRetrieverService.GetProducts(dbContext).ToListAsync();
        List<Sale> salesList = new List<Sale>();
        foreach (var product in products)
        {
            var jsonProducts = await this.GetProductSaleAsync(product.Id);
            var productGroupedSales = jsonProducts.GroupBy(p => p.SaleId);
            var sales = await productGroupedSales.Select(async group =>
            {
                var productSale = group.First();
                var saleProducts = products.Where(p => p.Id == productSale.ProductId).ToList();
                return new Sale()
                {
                    Id = productSale.SaleId,
                    SaleDate = DateTimeOffset.Parse(productSale.SaleDate),
                    Products = new List<Product>(saleProducts)
                };
            }).ToListFromTasks();
            salesList.AddRange(sales);
        }
        await dbContext.Set<Sale>().AddRangeAsync(salesList);
        await dbContext.SaveChangesAsync();
        return salesList;
    }

    public record JsonProduct(string Id, string Description, double SalePrice, string Image);

    public record JsonProductSale(string SaleId, string ProductId,string SaleDate);

}
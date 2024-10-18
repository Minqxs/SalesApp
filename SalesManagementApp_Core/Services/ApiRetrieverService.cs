using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.Entities;
using Newtonsoft.Json;

namespace SalesManagementApp_Core.Services;


public class ApiRetrieverService
{
    private readonly HttpClient _httpClient;
    private readonly AppDbContextService _dbContextService;

    public ApiRetrieverService(HttpClient httpClient, AppDbContextService dbContextService)
    {
        _httpClient = httpClient;
        _dbContextService = dbContextService;
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


    public async Task<List<JsonProductSale>> GetProductSaleAsync()
    {
        var response =
            await _httpClient.GetAsync(
                "https://singularsystems-tech-assessment-sales-api2.azurewebsites.net/product-sales");

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

        var existingProducts = await dbContext.Products.ToListAsync();

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
        var jsonProducts = await this.GetProductSaleAsync();
        var productGroupedSales = jsonProducts.GroupBy(p => p.SaleId);
        var sales = await productGroupedSales.Select(async group =>
        {
            var productSale = group.First();
            var products = await dbContext.Products.Where(p => p.Id == productSale.ProductId).ToListAsync();
            return new Sale()
            {
                Id = productSale.SaleId,
                SaleDate = DateTimeOffset.Parse(productSale.SaleDate),
                Products = products
            };
        }).ToListFromTasks();
        await dbContext.AddRangeAsync(sales);
        await dbContext.SaveChangesAsync();

        return sales;
    }

    public record JsonProduct(int Id, string Description, double SalePrice, string Image);

    public record JsonProductSale(int SaleId, int ProductId,string SaleDate);

}
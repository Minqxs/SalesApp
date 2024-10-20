using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Graphql;
using SalesManagementApp_Core.Interfaces;
using SalesManagementApp_Core.Services;

var builder = WebApplication.CreateBuilder(args);
var AllowSpecificOrigins = "_allowSpecificOrigins";
builder.Services.AddDbContextFactory<AppDbContext>(options =>
{
    options.UseInMemoryDatabase("InMemoryDb");
});
builder.Services.AddScoped<AppDbContextService>();
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddHttpClient<ApiRetrieverService>();
builder.Services.AddSingleton<SalesRetrieverService>();
builder.Services.AddSingleton<ProductsRetrieverService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ISaleService, SaleService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddFiltering();

var app = builder.Build();
app.UseCors(AllowSpecificOrigins);
app.MapGraphQL();
using (var scope = app.Services.CreateScope())
{
    var apiRetrieverService = scope.ServiceProvider.GetRequiredService<ApiRetrieverService>();

    // Run the methods to save products and sales on startup
    await apiRetrieverService.MapAndSaveProducts();
    await apiRetrieverService.MapAndSaveProductSales();
}

app.Run();


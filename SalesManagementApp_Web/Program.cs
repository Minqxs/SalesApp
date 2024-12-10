using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Graphql;
using SalesManagementApp_Core.Interfaces;
using SalesManagementApp_Core.Services;

var builder = WebApplication.CreateBuilder(args);
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
    options.AddPolicy("CorsPolicy",
        policy => policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

builder.Services.AddGraphQLServer()
    // .RegisterDbContext<AppDbContext>(DbContextKind.Synchronized)
    .AddQueryType<Query>()
    .AddMutationType<Mutations>()
    .AddMutationConventions(applyToAllMutations: false)
    .AddDiagnosticEventListener<DiagnosticEventListener>()
    .AddFiltering();

var app = builder.Build();
app.UseCors("CorsPolicy");
app.MapGraphQL();
using (var scope = app.Services.CreateScope())
{
    var apiRetrieverService = scope.ServiceProvider.GetRequiredService<ApiRetrieverService>();

    // Run the methods to save products and sales on startup
    await apiRetrieverService.MapAndSaveProducts();
    await apiRetrieverService.MapAndSaveProductSales();
}

app.Run();


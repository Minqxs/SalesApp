using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;

namespace SalesManagementApp_Core.Services;

public class SalesRetrieverService
{
    public IQueryable<Sale> GetSales(AppDbContext dbContext)
    {
        return dbContext.Sales
            .Include(p => p.Products);
    }

    public async Task<Sale> GetSalesById(AppDbContext dbContext, int saleId)
    {
        return await dbContext.Sales
            .Include(p => p.Products)
            .FirstOrDefaultAsync(
                p => p.Id == saleId) ?? throw new Exception("Sale was not found.");
    }
}
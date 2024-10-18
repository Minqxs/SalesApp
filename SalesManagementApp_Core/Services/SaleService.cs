using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Interfaces;

namespace SalesManagementApp_Core.Services;

public class SaleService : ISaleService
{
    private readonly AppDbContextService dbContextService;

    public SaleService(AppDbContextService _dbContext)
    {
        dbContextService = _dbContext;
    }
    public IQueryable<Sale> GetSales()
    {
        var context = this.dbContextService.CreateAndVerifyContext();
        return context.Sales
            .Include(p => p.Products);
    }

    public Task<Sale> CreateSale()
    {
        throw new NotImplementedException();
    }

    public Task<Sale> EditSale()
    {
        throw new NotImplementedException();
    }

    public Task<Sale> DeleteSale()
    {
        throw new NotImplementedException();
    }

}
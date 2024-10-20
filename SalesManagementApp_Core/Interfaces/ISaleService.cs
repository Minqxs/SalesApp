using SalesManagementApp_Core.DataAccess;
using SalesManagementApp_Core.Entities;
using SalesManagementApp_Core.Services;

namespace SalesManagementApp_Core.Interfaces;

public interface ISaleService
{
    public Task<Sale> CreateSale (AppDbContext dbContext, SaleService.CreateSaleInput input);

    public Task<Sale> EditSale (AppDbContext dbContext,SaleService.EditSaleInput input);

    public Task<Sale> DeleteSale (AppDbContext dbContext,SaleService.DeleteSaleInput input);

}